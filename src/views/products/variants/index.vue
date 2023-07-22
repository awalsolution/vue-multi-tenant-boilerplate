<template>
  <n-card title="Shops" v-permission="{ action: ['can view variants'] }">
    <n-space :vertical="true">
      <n-input
        type="text"
        size="small"
        v-model:value="params.name"
        @change="fetchList"
        placeholder="Search by Name"
      />
      <div class="overflow-x-scroll">
        <n-table :bordered="true" :single-line="false" size="medium" :striped="true">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Title</th>
              <th>Product Code</th>
              <th>SKU ID</th>
              <th>Images</th>
              <th>Attribute Name</th>
              <th>Attribute Value</th>
              <th>Status</th>
              <th>Stock Status</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Regular Price</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th
                class="text_center"
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
              <td colspan="7" class="data_placeholder"> Record Not Exist </td>
            </tr>
            <tr v-else v-for="item in list" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.products.title }}</td>
              <td>{{ item.products.product_code }}</td>
              <td>{{ item.sku_id }}</td>
              <td class="text-center">
                <n-avatar round size="large" :src="`${imgUrl}${item.images[0].images}`" />
              </td>
              <td>{{ item.attributes.name }}</td>
              <td>{{ item.attribute_value }}</td>
              <td>
                <n-tag :bordered="false" type="info">{{ item.status }}</n-tag>
              </td>
              <td>
                <n-tag :bordered="false" type="info">{{ item.stock_status }}</n-tag>
              </td>
              <td>{{ item.stock_quantity }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.regular_price }}</td>
              <td>{{ item.created_at }}</td>
              <td>{{ item.updated_at }}</td>
              <td
                class="text-center"
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
        </n-table>
      </div>
      <n-space style="align-items: center; padding-top: 15px">
        <n-pagination
          v-model:page="page"
          v-model:page-size="pageSize"
          :item-count="itemCount"
          :page-sizes="pageSizes"
          size="small"
          :show-quick-jumper="true"
          :show-size-picker="true"
        />
      </n-space>
      <!-- <n-button
        type="primary"
        size="large"
        :circle="true"
        style="position: fixed; bottom: 30px; right: 40px"
        @click="showModal = true"
        v-permission="{ action: ['can view variant create'] }"
      >
        <template #icon>
          <n-icon>
            <plus-outlined />
          </n-icon>
        </template>
      </n-button> -->
      <!-- <n-modal style="width: 60%" v-model:show="showModal" preset="dialog">
        <template #header>
          <div>Create New Variant</div>
        </template>
        <n-space :vertical="true">
          <add-variant
            @created="
              getList();
              showModal = false;
            "
          />
        </n-space>
      </n-modal> -->
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
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
  // import { deleteRecordApi } from '@/api';
  import { getVariantsApi } from '@/api/variant/variant';
  import { userPagination } from '@/hooks/userPagination';
  import { usePermission } from '@/hooks/web/usePermission';
  import { ref, onMounted, h, computed } from 'vue';
  // import { useDialog, useMessage } from 'naive-ui';
  import type { Component } from 'vue';
  import { NIcon, NPagination } from 'naive-ui';
  import { MoreOutlined, EditOutlined } from '@vicons/antd';
  // import AddVariant from '@/components/products/variants/AddVariant.vue';
  import EditVariant from '@/components/products/variants/EditVariant.vue';
  import { useGlobSetting } from '@/hooks/setting';

  const globSetting = useGlobSetting();
  const { imgUrl } = globSetting;
  // const dialog = useDialog();
  const selectedOption: any = ref(null);
  // const showModal = ref(false);
  const showEditModal = ref(false);
  const selectedId = ref();
  const { hasPermission } = usePermission();
  // const message = useMessage();
  const { getList, list, page, pageSizes, itemCount, pageSize, params }: any =
    userPagination(getVariantsApi);

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
    // {
    //   label: 'Delete',
    //   key: 'delete',
    //   icon: renderIcon(DeleteOutlined),
    //   permission: hasPermission(['can view variant delete']),
    // },
  ]);

  const filteredOptions = computed(() => {
    return moreOptions.value.filter((option) => option.permission);
  });

  // function confirmationDialog() {
  //   dialog.error({
  //     title: 'Confirmation',
  //     content: () => 'Are you sure you want to delete?',
  //     positiveText: 'Delete',
  //     negativeText: 'Cancel',
  //     onPositiveClick: deleteOperation,
  //   });
  // }

  // function deleteOperation() {
  //   const Loading = window['$loading'] || null;
  //   Loading.start();
  //   deleteRecordApi(`/variants/${selectedId.value}`)
  //     .then((result: any) => {
  //       message.success(result.message);
  //       getList();
  //       Loading.finish();
  //       dialog.destroyAll;
  //     })
  //     .catch((result) => {
  //       message.error(result.message);
  //       Loading.finish();
  //       dialog.destroyAll;
  //     });
  //   selectedId.value = null;
  //   selectedOption.value = null;
  // }

  const actionOperation = (item: any) => {
    if (selectedOption.value === 'edit') {
      showEditModal.value = true;
      selectedId.value = item.id;
      // router.push(`/variants/${item.id}`);
    }
    // else if (selectedOption.value === 'delete') {
    //   selectedId.value = item.id;
    //   confirmationDialog();
    // }
  };
  const selectedAction = (key: any) => {
    selectedOption.value = key;
  };
  const fetchList = () => {
    getList(params.value);
  };
  onMounted(() => {
    getList();
  });
</script>
<style lang="less" scoped>
  .text_center {
    text-align: center;
  }
  td {
    white-space: nowrap;
  }
  .data_placeholder {
    text-align: center;
    color: gray;
    padding: 20px 0;
    font-size: 18px;
    font-style: italic;
  }
</style>
