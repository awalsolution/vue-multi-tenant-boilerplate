<template>
  <DataTableLayout :loading="loading" v-permission="{ action: ['can view products'] }">
    <template #tableHeader>
      <div class="flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
        <div class="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
          <div class="flex gap-2">
            <NButton tertiary type="primary" :size="isMobile ? 'small' : 'medium'"
              >All (1000)
            </NButton>
            <NButton tertiary type="success" :size="isMobile ? 'small' : 'medium'">
              Published (800)
            </NButton>
            <NButton tertiary type="warning" :size="isMobile ? 'small' : 'medium'">
              Darft (200)
            </NButton>
          </div>
          <div class="flex flex-col sm:flex-row w-full items-center !space-x-2 sm:w-fit">
            <n-input
              class="sm:!w-[230px]"
              v-model:value="searchParams.title"
              clearable
              placeholder="Search By Title"
              size="small"
              type="text"
            >
              <template #prefix> <NIcon :component="SearchOutlined" class="mr-1" /> </template>
            </n-input>
            <n-input
              class="sm:!w-[230px]"
              v-model:value="searchParams.product_code"
              clearable
              placeholder="Search By Code"
              size="small"
              type="text"
            >
              <template #prefix> <NIcon :component="SearchOutlined" class="mr-1" /> </template>
            </n-input>
            <n-select
              class="sm:!w-[230px]"
              v-model:value="searchParams.status"
              :options="[
                { label: 'Active', value: 'active' },
                { label: 'Disabled', value: 'disabled' }
              ]"
              clearable
              filterable
              placeholder="Search By Status"
              size="small"
            />
            <n-button secondary size="small" strong type="info" @click="fetchList">
              Search
            </n-button>
          </div>
        </div>
        <div class="flex flex-1 w-full items-center justify-between space-x-3 sm:justify-end">
          <NButton
            secondary
            type="info"
            :size="isMobile ? 'small' : 'medium'"
            @click="router.push({ name: 'product_add' })"
            v-permission="{ action: ['can view product create'] }"
          >
            Create
          </NButton>
        </div>
      </div>
    </template>

    <template #tableContent>
      <table class="table">
        <thead class="head">
          <tr>
            <th class="th">Image</th>
            <th class="th">Vendor</th>
            <th class="th">Title</th>
            <th class="th">Product Code</th>
            <th class="th">Status</th>
            <th class="th">Created At</th>
            <th class="th">Updated At</th>
            <th
              class="sticky_el right-0 z-20"
              v-permission="{
                action: ['can view product update', 'can view product delete']
              }"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="list.length === 0">
            <td colspan="9" class="data_placeholder">Record Not Exist</td>
          </tr>
          <tr v-else v-for="item in list" :key="item.id" class="body_tr">
            <td class="text-center td">
              <n-avatar round size="large" :src="`${imgUrl}${item.product_image}`" />
            </td>
            <td class="td">{{ item.shop.shop_name }}</td>
            <td class="td">{{ item.title }}</td>
            <td class="td">{{ item.product_code }}</td>
            <td class="td">
              <n-tag :bordered="false" :type="item.status === 'disabled' ? 'error' : 'info'">
                {{ item.status }}
              </n-tag>
            </td>
            <td class="td">{{ item.created_at }}</td>
            <td class="td">{{ item.updated_at }}</td>
            <td
              class="sticky_el right-0 z-10"
              v-permission="{
                action: ['can view product update', 'can view product delete']
              }"
            >
              <n-dropdown
                @click="actionOperation(item)"
                :onSelect="selectedAction"
                trigger="click"
                :options="moreOptions"
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
        >
          <template #prefix="{ itemCount }"> Total: {{ itemCount }} </template>
        </n-pagination>
      </div>
    </template>
  </DataTableLayout>
</template>

<script lang="ts" setup>
import { deleteRecordApi } from '@src/api/endpoints';
import { useRouter } from 'vue-router';
import { ref, onMounted, h } from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import type { Component } from 'vue';
import { NIcon, NPagination } from 'naive-ui';
import { MoreOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@vicons/antd';
import { useEnv } from '@src/hooks/useEnv';
import { useLoading } from '@src/hooks/useLoading';
import { usePagination } from '@src/hooks/pagination/usePagination';
import DataTableLayout from '@src/layouts/DataTableLayout/index.vue';
import { useMobile } from '@src/hooks/useMediaQuery';

const { imgUrl } = useEnv();
const isMobile = useMobile();
const router = useRouter();
const dialog = useDialog();
const selectedOption: any = ref(null);
const selectedId = ref();
const message: any = useMessage();
const [loading, loadingDispatcher] = useLoading(false);

// fetch all records
const { getList, list, page, pageSizes, itemCount, pageSize, searchParams }: any =
  usePagination('/products');

onMounted(() => {
  getList();
});

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};

const moreOptions = ref([
  {
    label: 'Edit',
    key: 'edit',
    icon: renderIcon(EditOutlined)
  },
  {
    label: 'Delete',
    key: 'delete',
    icon: renderIcon(DeleteOutlined)
  }
]);

function confirmationDialog() {
  dialog.error({
    title: 'Confirmation',
    content: () => 'Are you sure you want to delete?',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick: deleteOperation
  });
}

function deleteOperation() {
  loadingDispatcher.loading();
  deleteRecordApi(`/products/${selectedId.value}`)
    .then((result: any) => {
      message.success(result.message);
      getList();
      loadingDispatcher.loaded();
      dialog.destroyAll;
    })
    .catch((result) => {
      message.error(result.message);
      loadingDispatcher.loaded();
      dialog.destroyAll;
    });
  selectedId.value = null;
  selectedOption.value = null;
}

const actionOperation = (item: any) => {
  if (selectedOption.value === 'edit') {
    router.push({ name: 'product_update', params: { id: item.id } });
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
  @apply sticky top-0 text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 z-20;
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
