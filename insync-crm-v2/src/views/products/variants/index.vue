<template>
  <DataTableLayout :loading="loading" v-permission="{ action: ['can view variants'] }">
    <template #tableHeader>
      <div class="flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
        <div class="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
          <div class="flex w-full items-center !space-x-2 sm:w-fit">
            <NInput
              v-model:value="searchParams.name"
              class="sm:!w-[200px]"
              clearable
              placeholder="KeywordSearch"
              @change="fetchList"
            >
              <template #prefix>
                <NIcon :component="SearchOutlined" class="mr-1" />
              </template>
            </NInput>
            <NButton type="primary" :size="isMobile ? 'small' : 'medium'" @click="fetchList">
              Search
            </NButton>
          </div>
          <NDatePicker
            v-model:value="searchParams.daterange"
            class="sm:!w-[250px]"
            type="daterange"
            clearable
            input-readonly
            @update:value="fetchList"
          />
        </div>
      </div>
    </template>

    <template #tableContent>
      <table class="table">
        <thead class="head">
          <tr>
            <th class="sticky_el left-0 z-20">ID</th>
            <th class="th">Product Title</th>
            <th class="th">Product Code</th>
            <th class="th">SKU ID</th>
            <th class="th">Images</th>
            <th class="th">Attribute Name</th>
            <th class="th">Attribute Value</th>
            <th class="th">Status</th>
            <th class="th">Stock Status</th>
            <th class="th">Quantity</th>
            <th class="th">Price</th>
            <th class="th">Regular Price</th>
            <th class="th">Created At</th>
            <th class="th">Updated At</th>
            <th
              class="sticky_el right-0 z-20"
              v-permission="{
                action: ['can view variant update', 'can view variant delete'],
              }"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="list.length === 0">
            <td colspan="15" class="data_placeholder"> Record Not Exist </td>
          </tr>
          <tr v-else v-for="item in list" :key="item.id">
            <td class="sticky_el left-0 z-10">{{ item.id }}</td>
            <td class="td">{{ item.products.title }}</td>
            <td class="td">{{ item.products.product_code }}</td>
            <td class="td">{{ item.sku_id }}</td>
            <td class="text-center td">
              <n-avatar round size="large" :src="`${imgUrl}${item.images[0].images}`" />
            </td>
            <td class="td">{{ item.attributes.name }}</td>
            <td class="td">{{ item.attribute_value }}</td>
            <td class="td">
              <n-tag :bordered="false" type="info">{{ item.status }}</n-tag>
            </td>
            <td class="td">
              <n-tag :bordered="false" type="info">{{ item.stock_status }}</n-tag>
            </td>
            <td class="td">{{ item.stock_quantity }}</td>
            <td class="td">{{ item.price }}</td>
            <td class="td">{{ item.regular_price }}</td>
            <td class="td">{{ item.created_at }}</td>
            <td class="td">{{ item.updated_at }}</td>
            <td
              class="sticky_el right-0 z-10"
              v-permission="{
                action: ['can view variant update', 'can view variant delete'],
              }"
            >
              <n-dropdown
                @click="actionOperation(item)"
                :onSelect="selectedAction"
                trigger="click"
                :options="filteredOptions"
              >
                <n-button size="small" :circle="true">
                  <n-icon>
                    <more-outlined />
                  </n-icon>
                </n-button>
              </n-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </template>

    <template #tableFooter>
      <div class="flex flex-col items-center space-y-2 sm:flex-row sm:justify-end sm:space-y-0">
        <n-pagination
          v-model:page="page"
          v-model:page-size="pageSize"
          :item-count="itemCount"
          :page-sizes="pageSizes"
          size="small"
          :show-quick-jumper="true"
          :show-size-picker="true"
        />
      </div>
    </template>
    <n-modal style="width: 60%" v-model:show="showEditModal" preset="dialog">
      <template #header>
        <div>Update Variant</div>
      </template>
      <n-space :vertical="true">
        <edit-variant
          :id="selectedId"
          @updated="
            getList();
            showEditModal = false;
          "
        />
      </n-space>
    </n-modal>
  </DataTableLayout>
</template>

<script lang="ts" setup>
  import { deleteRecordApi } from '@src/api/endpoints';
  import { usePermission } from '@src/utils/permission/usePermission';
  import { ref, onMounted, h, computed } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';
  import type { Component } from 'vue';
  import { NIcon, NPagination } from 'naive-ui';
  import { MoreOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@vicons/antd';
  import { useLoading } from '@src/hooks/useLoading';
  import { usePagination } from '@src/hooks/pagination/usePagination';
  import { useEnv } from '@src/hooks/useEnv';
  import EditVariant from '@src/components/products/variants/EditVariant.vue';
  import DataTableLayout from '@src/layouts/DataTableLayout/index.vue';
  import { useMobile } from '@src/hooks/useMediaQuery';

  const { imgUrl } = useEnv();
  const isMobile = useMobile();
  const dialog = useDialog();
  const selectedOption: any = ref(null);
  const showEditModal = ref(false);
  const selectedId = ref();
  const { hasPermission } = usePermission();
  const message: any = useMessage();
  const [loading, loadingDispatcher] = useLoading(false);

  // fetch all records
  const { getList, list, page, pageSizes, itemCount, pageSize, searchParams }: any =
    usePagination('/variants');

  onMounted(() => {
    getList();
  });

  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };

  const moreOptions = ref([
    {
      label: 'Edit',
      key: 'edit',
      icon: renderIcon(EditOutlined),
      permission: hasPermission(['can view variant update']),
    },
    {
      label: 'Delete',
      key: 'delete',
      icon: renderIcon(DeleteOutlined),
      permission: hasPermission(['can view variant delete']),
    },
  ]);

  const filteredOptions = computed(() => {
    return moreOptions.value.filter((option) => option.permission);
  });

  function confirmationDialog() {
    dialog.error({
      title: 'Confirmation',
      content: () => 'Are you sure you want to delete?',
      positiveText: 'Delete',
      negativeText: 'Cancel',
      onPositiveClick: deleteOperation,
    });
  }

  function deleteOperation() {
    loadingDispatcher.loading();
    deleteRecordApi(`/variants/${selectedId.value}`)
      .then((result: any) => {
        message.success(result.message);
        getList();
        loadingDispatcher.loaded();
        dialog.destroyAll;
      })
      .catch((result: any) => {
        message.error(result.message);
        loadingDispatcher.loaded();
        dialog.destroyAll;
      });
    selectedId.value = null;
    selectedOption.value = null;
  }

  const actionOperation = (item: any) => {
    if (selectedOption.value === 'edit') {
      showEditModal.value = true;
      selectedId.value = item.id;
      // router.push(`/variants/${item.id}`);
    } else if (selectedOption.value === 'delete') {
      selectedId.value = item.id;
      confirmationDialog();
    }
  };

  const selectedAction = (key: any) => {
    selectedOption.value = key;
  };

  const fetchList = () => {
    getList(searchParams.value);
  };
</script>

<style lang="scss" scoped>
  .table {
    @apply w-full text-sm text-left text-gray-500 dark:text-gray-400;
  }
  .head {
    @apply sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 z-20;
  }
  .th {
    @apply px-6 py-3 border-r border-b border-gray-200 dark:border-gray-800 text-center whitespace-nowrap;
  }
  .body_tr {
    @apply hover:bg-gray-50 dark:hover:bg-gray-600;
  }
  .td {
    @apply px-3 border-r border-b border-gray-200 dark:border-gray-800 whitespace-nowrap;
  }
  .sticky_el {
    @apply sticky bg-gray-50 dark:bg-gray-700 px-6 whitespace-nowrap text-center border border-gray-200 dark:border-gray-800;
  }
  .data_placeholder {
    text-align: center;
    color: gray;
    padding: 20px 0;
    font-size: 18px;
    font-style: italic;
  }
</style>
