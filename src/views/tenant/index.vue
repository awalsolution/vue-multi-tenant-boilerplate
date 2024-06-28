<template>
  <n-space :vertical="true">
    <n-card title="Tenant List">
      <template #header-extra>
        <NButton
          secondary
          type="info"
          size="small"
          @click="router.push('add')"
          v-permission="{ action: ['tenant create'] }"
        >
          Add Tenant
        </NButton>
      </template>
      <div class="flex flex-col gap-2 lg:flex-row w-full">
        <n-input
          v-model:value="searchParams.company_name"
          clearable
          placeholder="Search by name"
          size="small"
          type="text"
        >
          <template #prefix> <NIcon :component="SearchOutlined" class="mr-1" /> </template>
        </n-input>
        <n-button secondary size="small" strong type="info" @click="fetchList"> Search </n-button>
      </div>
      <div class="table_content_container">
        <table class="table">
          <thead class="head">
            <tr>
              <th class="th">Domain</th>
              <th class="th">Database Name</th>
              <th class="th">Name</th>
              <th class="th">Email</th>
              <th class="th">Phone#</th>
              <th class="th">Plan</th>
              <th class="th">Plan Type</th>
              <th class="th text-center">Status</th>
              <th class="th">Created At</th>
              <th
                class="sticky_el right-0 z-20"
                v-permission="{
                  action: ['tenant update', 'tenant delete']
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
              <td class="td">{{ item.domain_name }}</td>
              <td class="td">{{ item.db_name }}</td>
              <td class="td">{{ item.first_name + ' ' + item.last_name }}</td>
              <td class="td">{{ item.email }}</td>
              <td class="td">{{ item.phone_number }}</td>
              <td class="td">{{ item?.plan?.name }}</td>
              <td class="td">{{ item?.plan?.type }}</td>
              <td class="td text-center">
                <n-tag :bordered="false" :type="item.status === 'disabled' ? 'error' : 'info'">
                  {{ item.status === 1 ? 'Active' : 'Disable' }}
                </n-tag>
              </td>
              <td class="td">{{ item.created_at }}</td>
              <td class="td flex gap-2 justify-center">
                <n-button
                  strong
                  secondary
                  type="info"
                  @click="
                    router.push({
                      name: 'tenant_view',
                      params: { db: item.db_name }
                    })
                  "
                >
                  Details
                </n-button>
                <n-button
                  strong
                  secondary
                  type="warning"
                  @click="
                    router.push({
                      name: 'tenant_edit',
                      params: { id: item.id }
                    })
                  "
                >
                  Edit
                </n-button>
                <n-button strong secondary type="error"> Delete </n-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </n-card>
    <n-card>
      <n-pagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :item-count="itemCount"
        :page-sizes="pageSizes"
        size="small"
        :show-quick-jumper="true"
        :show-size-picker="true"
      >
        <template #prefix="{ itemCount }"> Total Tenant: {{ itemCount }} </template>
      </n-pagination>
    </n-card>

    <n-modal style="width: 40%" v-model:show="showModal" preset="dialog">
      <template #header>
        <div>Create New Tenant</div>
      </template>
      <n-space :vertical="true">
        <add-tenant
          @created="
            getList();
            showModal = false;
          "
        />
      </n-space>
    </n-modal>

    <n-modal style="width: 40%" v-model:show="showEditModal" preset="dialog">
      <template #header>
        <div>Update Tenant</div>
      </template>
      <n-space :vertical="true">
        <edit-tenant
          :id="selectedId"
          @updated="
            getList();
            showEditModal = false;
          "
        />
      </n-space>
    </n-modal>
  </n-space>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { NIcon, NPagination } from 'naive-ui';
import { SearchOutlined } from '@vicons/antd';
import { usePagination } from '@src/hooks/pagination/usePagination';
import AddTenant from '@src/components/tenant/AddTenant.vue';
import EditTenant from '@src/components/tenant/EditTenant.vue';

const router = useRouter();
const showModal = ref(false);
const showEditModal = ref(false);
const selectedId = ref();

// fetch all records
const { getList, list, page, pageSizes, itemCount, pageSize, searchParams }: any =
  usePagination('/tenant');

onMounted(() => {
  getList();
});

const fetchList = () => {
  getList(searchParams.value);
};
</script>

<style lang="scss" scoped>
.table_content_container {
  @apply relative overflow-x-auto border border-gray-200 dark:border-gray-800 mt-3;
}
.table {
  @apply w-full text-sm text-left text-gray-500 dark:text-gray-400;
}
.head {
  @apply sticky top-0 text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 z-20;
}
.th {
  @apply px-3 py-3 border-r border-b border-gray-200 dark:border-gray-800  whitespace-nowrap;
}
.body_tr {
  @apply hover:bg-gray-50 dark:hover:bg-gray-600;
}
.td {
  @apply px-3 py-3 border-r border-b border-gray-200 dark:border-gray-800 whitespace-nowrap;
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
