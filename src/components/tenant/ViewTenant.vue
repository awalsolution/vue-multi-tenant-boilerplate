<template>
  <div class="mb-5">
    <n-grid cols="1 s:2 m:3 l:8 xl:8 2xl:8" responsive="screen" :x-gap="16" :y-gap="8">
      <n-grid-item v-for="(item, index) in dataList" :key="index">
        <NCard content-style="padding-top: 0;" size="small" :bordered="false">
          <template #footer>
            <n-skeleton v-if="loading" size="medium" />
            <div class="cursor-pointer" v-else>
              <p class="flex justify-center">
                <span>
                  <n-icon :size="item.size" class="flex-1" :color="item.color">
                    <component :is="item.icon" v-on="item.eventObject || {}" />
                  </n-icon>
                </span>
              </p>
              <p class="flex justify-between">
                <span>{{ item.title }}</span>
                <span>{{ item.data.value.length }}</span>
              </p>
            </div>
          </template>
        </NCard>
      </n-grid-item>
    </n-grid>
    <div class="flex gap-2 mt-2">
      <n-card title="Role list">
        <div class="table_content_container">
          <table class="table">
            <thead class="head">
              <tr>
                <th class="th">Role Name</th>
                <th
                  class="th text-center"
                  v-permission="{
                    action: ['tenant update', 'tenant delete']
                  }"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="roles.length === 0">
                <td colspan="6" class="data_placeholder">Record Not Exist</td>
              </tr>
              <tr v-else v-for="item in roles" :key="item.id" class="body_tr">
                <td v-if="item.name" class="td">{{ item.name }}</td>
                <td
                  class="td flex gap-3 justify-center"
                  v-permission="{
                    action: ['tenant update', 'tenant delete']
                  }"
                >
                  <n-button
                    strong
                    secondary
                    type="warning"
                    @click="
                      router.push({
                        name: 'tenant_edit_role',
                        query: { roleId: item.id, dbName: route.query.db_name }
                      })
                    "
                  >
                    Edit
                  </n-button>
                  <n-button strong secondary type="error" @click="roleConfirmationDialog(item)">
                    Delete
                  </n-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </n-card>
      <n-card title="Permission list">
        <div class="table_content_container">
          <table class="table">
            <thead class="head">
              <tr>
                <th class="th">Permission Name</th>
                <th
                  class="th text-center"
                  v-permission="{
                    action: ['tenant update', 'tenant delete']
                  }"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="permissions.length === 0">
                <td colspan="6" class="data_placeholder">Record Not Exist</td>
              </tr>
              <tr v-else v-for="item in permissions" :key="item.id" class="body_tr">
                <td v-if="item.name" class="td">{{ item.name }}</td>
                <td
                  class="td flex gap-3 justify-center"
                  v-permission="{
                    action: ['tenant update', 'tenant delete']
                  }"
                >
                  <n-button strong secondary type="warning"> Edit </n-button>
                  <n-button strong secondary type="error"> Delete </n-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </n-card>
      <n-card title="User list">
        <div class="table_content_container">
          <table class="table">
            <thead class="head">
              <tr>
                <th class="th">Email</th>
                <th class="th">Status</th>
                <th
                  class="th text-center"
                  v-permission="{
                    action: ['tenant update', 'tenant delete']
                  }"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="users.length === 0">
                <td colspan="6" class="data_placeholder">Record Not Exist</td>
              </tr>
              <tr v-else v-for="item in users" :key="item.id" class="body_tr">
                <td v-if="item.email" class="td">{{ item.email }}</td>
                <td class="td text-center">
                  <n-tag :bordered="false" :type="item.status === 'disabled' ? 'error' : 'info'">
                    {{ item.status === 1 ? 'Active' : 'Disable' }}
                  </n-tag>
                </td>
                <td
                  class="td flex gap-3 justify-center"
                  v-permission="{
                    action: ['tenant update', 'tenant delete']
                  }"
                >
                  <n-button strong secondary type="warning"> Edit </n-button>
                  <n-button strong secondary type="error"> Delete </n-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDialog } from 'naive-ui';
import { UsergroupAddOutlined } from '@vicons/antd';
import { LockOpen16Regular, PersonLock24Regular } from '@vicons/fluent';
import { deleteRecordApi } from '@src/api/endpoints';
import { getRecordApi } from '@src/api/endpoints';

const route = useRoute();
const router = useRouter();
const permissions: Ref = ref([]);
const users: Ref = ref([]);
const roles: Ref = ref([]);
const dialog = useDialog();
const selectedId: Ref = ref();
const loading: Ref = ref(true);

const getList = () => {
  getRecordApi(`/tenant/detail/${route.query.db_name}`).then((res: any) => {
    permissions.value = res.data?.permissions;
    users.value = res.data?.users;
    roles.value = res.data?.roles;
  });
};

onMounted(() => {
  getList();
  loading.value = false;
});

function roleConfirmationDialog(item: { id: number }) {
  selectedId.value = item.id;
  dialog.error({
    title: 'Confirmation',
    content: () => 'Are you sure you want to delete?',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick: deleteOperation
  });
}

function deleteOperation() {
  deleteRecordApi(`/tenant/delete-role/${selectedId.value}`, { db_name: route.query.db_name })
    .then((res: any) => {
      window['$message'].success(res.message);
      getList();
      dialog.destroyAll;
    })
    .catch((res: any) => {
      window['$message'].error(res.message);
      dialog.destroyAll;
    });
  selectedId.value = null;
}

// data list
const dataList = [
  {
    icon: UsergroupAddOutlined,
    size: '32',
    title: 'Users',
    data: users,
    color: '#69c0ff',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: LockOpen16Regular,
    size: '32',
    title: 'Permissions',
    color: '#69c0ff',
    data: permissions,
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: PersonLock24Regular,
    size: '32',
    title: 'Roles',
    data: roles,
    color: '#ff9c6e',
    eventObject: {
      click: () => {}
    }
  }
];
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
