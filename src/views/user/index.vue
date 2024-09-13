<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">User List</h1>
      <Button
        @click="openAddDialog"
        severity="primary"
        label="Add User"
        icon="pi pi-plus"
        v-permission="{ action: ['user create'] }"
      />
    </div>
    <DataTable
      class=""
      :value="list"
      stripedRows
      dataKey="id"
      scrollable
      v-model:filters="filters"
      filterDisplay="row"
      paginator
      :rows="20"
      :rowsPerPageOptions="pageSizes"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Users`"
    >
      <template #empty> No Users found. </template>
      <Column
        field="profile.first_name"
        header="Name"
        class="whitespace-nowrap min-w-56"
        :show-filter-menu="false"
        :showClearButton="false"
      >
        <template #body="{ data }">
          {{ data.profile.first_name + ' ' + data.profile.last_name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by First Name"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column
        field="email"
        header="Email"
        class="whitespace-nowrap min-w-56"
        :show-filter-menu="false"
        :showClearButton="false"
      >
        <template #body="{ data }">
          {{ data.email }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by Email"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column
        field="profile.phone_number"
        header="Phone#"
        class="whitespace-nowrap min-w-56"
        :show-filter-menu="false"
        :showClearButton="false"
      >
        <template #body="{ data }">
          {{ data?.profile?.phone_number }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by Phone"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column field="profile" header="Address" class="whitespace-nowrap">
        <template #body="{ data }">
          {{
            data?.profile?.address +
            ' ' +
            data?.profile?.city +
            ' ' +
            data?.profile?.state +
            ' ' +
            data?.profile?.country
          }}
        </template>
      </Column>

      <Column field="status" header="status" class="whitespace-nowrap">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 0 ? 'error' : 'info'">
            {{ data.status === 1 ? 'Active' : 'Disable' }}
          </Tag>
        </template>
      </Column>
      <Column field="created_by" header="Auther" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.created_by }}
        </template>
      </Column>
      <Column field="created_at" header="Created At" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.created_at }}
        </template>
      </Column>
      <Column
        header="Actions"
        v-permission="{ action: ['user update', 'user delete', 'user assign permission'] }"
        class="whitespace-nowrap"
      >
        <template #body="{ data }">
          <Button
            icon="pi pi-lock"
            outlined
            rounded
            class="mr-2"
            @click="openEditDialog(data)"
            v-permission="{ action: ['user assign permission'] }"
          />
          <Button
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="openEditDialog(data)"
            v-permission="{ action: ['user update'] }"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
            v-permission="{ action: ['user delete'] }"
          />
        </template>
      </Column>
    </DataTable>
    <Dialog v-model:visible="addDialog" class="w-1/2" :header="dialogHeader" :modal="true">
      <div class="flex flex-col gap-6">
        <div class="flex gap-5">
          <div class="w-full">
            <label for="first_name" class="block font-bold mb-3">First Name</label>
            <InputText
              id="first_name"
              v-model.trim="data.first_name"
              required="true"
              :invalid="submitted && !data.first_name"
              fluid
            />
            <small v-if="submitted && !data.first_name" class="text-red-500">
              First Name is required.
            </small>
          </div>
          <div class="w-full">
            <label for="last_name" class="block font-bold mb-3">Last Name</label>
            <InputText
              id="last_name"
              v-model.trim="data.last_name"
              required="true"
              :invalid="submitted && !data.last_name"
              fluid
            />
            <small v-if="submitted && !data.last_name" class="text-red-500">
              Last Name is required.
            </small>
          </div>
        </div>
        <div class="flex gap-5">
          <div class="w-full">
            <label for="email" class="block font-bold mb-3">Email</label>
            <InputText
              id="email"
              v-model.trim="data.email"
              required="true"
              :invalid="submitted && !data.email"
              fluid
            />
            <small v-if="submitted && !data.last_name" class="text-red-500">
              Last Name is required.
            </small>
          </div>
          <div class="w-full">
            <label for="password" class="block font-bold mb-3">Password</label>
            <InputText
              id="password"
              v-model.trim="data.password"
              required="true"
              :invalid="submitted && !data.password"
              fluid
            />
            <small v-if="submitted && !data.password" class="text-red-500">
              Password is required.
            </small>
          </div>
        </div>

        <div>
          <label for="role" class="block font-bold mb-3">Select Role</label>
          <Select
            id="role"
            v-model="data.role_id"
            :options="roles"
            @focus="getRolesOnFocus"
            optionLabel="name"
            optionValue="id"
            placeholder="Select Role"
            fluid
            :loading="roleLoading"
          ></Select>
        </div>
        <div>
          <label for="type" class="block font-bold mb-3">Status</label>
          <ToggleSwitch v-model="data.status" :true-value="1" :false-value="0" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveForm" />
      </template>
    </Dialog>
    <Dialog v-model:visible="delDialog" class="w-1/3" header="Confirm" :modal="true">
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="data">
          Are you sure you want to delete <b>{{ data.name }} </b>?
        </span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="delDialog = false" />
        <Button label="Yes" icon="pi pi-check" severity="danger" @click="handleDelete" />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, watch } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import ToggleSwitch from 'primevue/toggleswitch';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Select from 'primevue/select';
import { createRecordApi, deleteRecordApi, updateRecordApi } from '@src/api/endpoints';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';
import { useRolefilter } from '@src/filters/role';

const data: Ref = ref({});
const submitted: Ref = ref({});
const addDialog: Ref = ref(false);
const delDialog: Ref = ref(false);
const dialogHeader: Ref = ref();
const delId: Ref = ref();
const { roles, roleLoading, getRolesOnFocus } = useRolefilter();

const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/users');

const filters = ref({
  'profile.first_name': { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  'profile.phone_number': { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const fetchList = () => {
  searchParams.value = {
    name: filters.value['profile.first_name'].value || '',
    email: filters.value.email.value || '',
    phone: filters.value['profile.phone_number'].value || ''
  };
  getList(searchParams.value);
};
// Debounce fetchList by 2 seconds
const debouncedFetchList = debounce(fetchList, 1000);

// Watch filters and call the debounced function when they change
watch(filters, debouncedFetchList, { deep: true });

onMounted(() => {
  fetchList();
});

function openAddDialog() {
  dialogHeader.value = 'Add User';
  data.value = {};
  submitted.value = false;
  addDialog.value = true;
}

function openEditDialog(item: any) {
  dialogHeader.value = 'Edit User';
  data.value = item;
  submitted.value = false;
  addDialog.value = true;
}

function openDeleteDialog(item: any) {
  delId.value = item.id;
  delDialog.value = true;
}

function hideDialog() {
  addDialog.value = false;
  submitted.value = false;
}

const saveForm = () => {
  submitted.value = true;
  if (data?.value.name?.trim()) {
    if (data?.value.id) {
      updateRecordApi(`/users/${data.value.id}`, data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    } else {
      createRecordApi('/users', data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    }
    addDialog.value = false;
    data.value = {};
  }
};

function handleDelete() {
  deleteRecordApi(`/users/${delId.value}`)
    .then((res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    })
    .catch((res) => {
      window.toast('error', 'Error Message', res.message);
    });
  delDialog.value = false;
  delId.value = null;
}
</script>

<style lang="scss" scoped></style>

<!-- <template>
  <n-space :vertical="true">
    <n-card title="User List">
      <template #header-extra>
        <NButton
          secondary
          type="info"
          size="small"
          @click="showModal = true"
          v-permission="{ action: ['user create'] }"
        >
          Add User
        </NButton>
      </template>
      <div class="flex flex-col gap-2 lg:flex-row w-full">
        <n-input
          v-model:value="searchParams.name"
          clearable
          placeholder="Search by name"
          size="small"
          type="text"
        >
          <template #prefix> <NIcon :component="SearchOutlined" class="mr-1" /> </template>
        </n-input>
        <n-input
          v-model:value="searchParams.email"
          clearable
          placeholder="Search by email"
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
              <th class="th">Name</th>
              <th class="th">Picture</th>
              <th class="th">Email</th>
              <th class="th">Role</th>
              <th class="th">Phone#</th>
              <th class="th">Status</th>
              <th class="th">Address</th>
              <th class="th">Created At</th>
              <th
                class="sticky_el right-0 z-20"
                v-permission="{
                  action: ['user update', 'user delete', 'user assign permission']
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
              <td class="td">
                {{ item?.profile?.first_name + ' ' + item?.profile?.last_name }}
              </td>
              <td class="td text-center pt-2">
                <n-avatar size="large" :src="`${imgUrl}${item?.profile?.profile_picture}`" />
              </td>
              <td class="td">{{ item?.email }}</td>
              <td class="td">
                <n-space>
                  <n-tag v-for="role in item.roles" :key="role.id" type="success" :bordered="false">
                    {{ role?.name }}
                  </n-tag>
                </n-space>
              </td>
              <td class="td">{{ item?.profile?.phone_number }}</td>
              <td class="td">
                <n-tag :bordered="false" :type="item.status === 'disabled' ? 'error' : 'info'">
                  {{ item.status === 1 ? 'Active' : 'Disable' }}
                </n-tag>
              </td>
              <td class="td">
                {{
                  item?.profile?.address +
                  ' ' +
                  item?.profile?.city +
                  ' ' +
                  item?.profile?.state +
                  ' ' +
                  item?.profile?.country
                }}
              </td>
              <td class="td">{{ item.created_at }}</td>
              <td
                class="sticky_el right-0 z-10"
                v-permission="{
                  action: ['user update', 'user delete', 'user assign permission']
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
    </n-card>
    <n-card>
      <n-pagination
        v-model:page="page"
        v-model:page-size="perPage"
        :item-count="itemCount"
        :page-sizes="pageSizes"
        size="small"
        :show-quick-jumper="true"
        :show-size-picker="true"
      >
        <template #prefix="{ itemCount }"> Total Products: {{ itemCount }} </template>
      </n-pagination>
    </n-card>
    <n-modal style="width: 50%" v-model:show="showModal" preset="dialog">
      <template #header>
        <div>Create New User</div>
      </template>
      <n-space :vertical="true">
        <add-user
          @created="
            getList();
            showModal = false;
          "
        />
      </n-space>
    </n-modal>

    <n-modal style="width: 70%" v-model:show="showEditModal" preset="dialog">
      <template #header>
        <div>Update User</div>
      </template>
      <n-space :vertical="true">
        <edit-user
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
import { ref, onMounted, computed, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { NIcon, NPagination, useDialog } from 'naive-ui';
import { MoreOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@vicons/antd';
import { deleteRecordApi } from '@src/api/endpoints';
import { useEnv } from '@src/hooks/useEnv';
import { renderIcon } from '@src/utils/renderIcon';
import { usePermission } from '@src/hooks/permission/usePermission';
import { usePagination } from '@src/hooks/pagination/usePagination';
import AddUser from '@src/components/user/AddUser.vue';
import EditUser from '@src/components/user/EditUser.vue';

const { imgUrl } = useEnv();
const router = useRouter();
const dialog = useDialog();
const selectedOption: Ref = ref(null);
const showModal = ref(false);
const showEditModal = ref(false);
const selectedId = ref();
const { hasPermission } = usePermission();

// fetch all records
const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/user');

onMounted(() => {
  getList();
});

const moreOptions = ref([
  {
    label: 'Assign Permission',
    key: 'assign_permission',
    icon: renderIcon(EditOutlined),
    permission: hasPermission(['user assign permission'])
  },
  {
    label: 'Edit',
    key: 'edit',
    icon: renderIcon(EditOutlined),
    permission: hasPermission(['user update'])
  },
  {
    label: 'Delete',
    key: 'delete',
    icon: renderIcon(DeleteOutlined),
    permission: hasPermission(['user delete'])
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
  deleteRecordApi(`/user/${selectedId.value}`)
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
  selectedOption.value = null;
}

const actionOperation = (item: any) => {
  if (selectedOption.value === 'assign_permission') {
    router.push({
      name: 'user_assign_permission',
      params: { userId: item.id }
    });
  } else if (selectedOption.value === 'edit') {
    showEditModal.value = true;
    selectedId.value = item.id;
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
  @apply px-3 py-3 border-r border-b border-gray-200 dark:border-gray-800 whitespace-nowrap;
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
</style> -->
