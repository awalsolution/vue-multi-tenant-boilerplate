<template>
  <DataTableLayout :loading="loading">
    <template #header>
      <div class="flex w-full items-center px-10 pt-5">
        <h2 class="text-lg">Companies</h2>
        <div class="flex flex-1 w-full items-center justify-between space-x-3 sm:justify-end">
          <NButton
            secondary
            type="info"
            :size="isMobile ? 'small' : 'medium'"
            @click="showModal = true"
            v-permission="{ action: ['can view company create'] }"
          >
            Add Company
          </NButton>
        </div>
      </div>
    </template>

    <template #content>
      <div class="px-10 pt-5 w-full">
        <div class="bg-white rounded-lg shadow-lg w-full overflow-x-scroll border border-gray-200">
          <div class="flex gap-3 flex-col sm:flex-row flex-wrap w-full items-center sm:w-fit p-3">
            <n-input
              class="sm:!w-[230px]"
              v-model:value="searchParams.company_name"
              clearable
              placeholder="Search By Name"
              size="small"
              type="text"
            >
              <template #prefix> <NIcon :component="SearchOutlined" class="mr-1" /> </template>
            </n-input>
            <n-input
              class="sm:!w-[230px]"
              v-model:value="searchParams.phone_number"
              clearable
              placeholder="Search By Phone"
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
          <table class="table">
            <thead class="head">
              <tr>
                <th class="th">Company Name</th>
                <th class="th">Logo</th>
                <th class="th">Phone#</th>
                <th class="th text-center">Status</th>
                <th class="th">Address</th>
                <th class="th">Created At</th>
                <th
                  class="sticky_el right-0 z-20"
                  v-permission="{
                    action: ['can view company update', 'can view company delete']
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
                <td class="td">{{ item.company_name }}</td>
                <td class="td text-center pt-1">
                  <n-avatar :size="50" :src="`${imgUrl}${item.logo}`" />
                </td>
                <td class="td">{{ item.phone_number }}</td>
                <td class="td text-center">
                  <n-tag :bordered="false" :type="item.status === 'disabled' ? 'error' : 'info'">
                    {{ item.status === 1 ? 'Active' : 'Disable' }}
                  </n-tag>
                </td>
                <td class="td">
                  {{ item.address + ' ' + item.city + ' ' + item?.state + ' ' + item.country }}
                </td>
                <td class="td">{{ item.created_at }}</td>
                <td
                  class="sticky_el right-0 z-10"
                  v-permission="{
                    action: ['can view company update', 'can view company delete']
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
        </div>
      </div>
    </template>

    <template #footer>
      <div class="px-10 p-3">
        <div
          class="flex flex-col items-center sm:flex-row sm:justify-end bg-white p-3 rounded-lg shadow-lg"
        >
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
      </div>
    </template>

    <n-modal style="width: 60%" v-model:show="showModal" preset="dialog">
      <template #header>
        <div>Create New Company</div>
      </template>
      <n-space :vertical="true">
        <add-company
          @created="
            getList();
            showModal = false;
          "
        />
      </n-space>
    </n-modal>

    <n-modal style="width: 60%" v-model:show="showEditModal" preset="dialog">
      <template #header>
        <div>Update Company</div>
      </template>
      <n-space :vertical="true">
        <edit-company
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
import { ref, onMounted, computed } from 'vue';
import { NIcon, NPagination, useDialog } from 'naive-ui';
import { MoreOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@vicons/antd';
import { deleteRecordApi } from '@src/api/endpoints';
import { useEnv } from '@src/hooks/useEnv';
import { useLoading } from '@src/hooks/useLoading';
import { useMobile } from '@src/hooks/useMediaQuery';
import { renderIcon } from '@src/utils/renderIcon';
import { usePermission } from '@src/hooks/permission/usePermission';
import { usePagination } from '@src/hooks/pagination/usePagination';
import DataTableLayout from '@src/layouts/DataTableLayout/index.vue';
import AddCompany from '@src/components/company/AddCompany.vue';
import EditCompany from '@src/components/company/EditCompany.vue';

const { imgUrl } = useEnv();
const isMobile = useMobile();
const dialog = useDialog();
const selectedOption: any = ref(null);
const showModal = ref(false);
const showEditModal = ref(false);
const selectedId = ref();
const { hasPermission } = usePermission();
const [loading, loadingDispatcher] = useLoading(false);

// fetch all records
const { getList, list, page, pageSizes, itemCount, pageSize, searchParams }: any =
  usePagination('/company');

onMounted(() => {
  getList();
});

const moreOptions = ref([
  {
    label: 'Edit',
    key: 'edit',
    icon: renderIcon(EditOutlined),
    permission: hasPermission(['can view company update'])
  },
  {
    label: 'Delete',
    key: 'delete',
    icon: renderIcon(DeleteOutlined),
    permission: hasPermission(['can view company delete'])
  }
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
    onPositiveClick: deleteOperation
  });
}

function deleteOperation() {
  loadingDispatcher.start();
  deleteRecordApi(`/company/${selectedId.value}`)
    .then((res: any) => {
      window['$message'].success(res.message);
      getList();
      loadingDispatcher.end();
      dialog.destroyAll;
    })
    .catch((res: any) => {
      window['$message'].error(res.message);
      loadingDispatcher.end();
      dialog.destroyAll;
    });
  selectedId.value = null;
  selectedOption.value = null;
}

const actionOperation = (item: any) => {
  if (selectedOption.value === 'edit') {
    showEditModal.value = true;
    selectedId.value = item.id;
    // router.push(`/roles/${item.id}`);
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
  @apply text-sm w-full overflow-x-auto text-left text-gray-500 dark:text-gray-400;
}
.head {
  @apply sticky top-0 text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 z-20;
}
.th {
  @apply px-3 py-3 border-t border-r border-b border-gray-200 dark:border-gray-800 whitespace-nowrap;
}
.body_tr {
  @apply hover:bg-gray-50 dark:hover:bg-gray-600;
}
.td {
  @apply px-3 py-2 border-r border-b border-gray-200 dark:border-gray-800 whitespace-nowrap;
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
