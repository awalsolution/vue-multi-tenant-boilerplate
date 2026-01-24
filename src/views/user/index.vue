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
    <DataTable :value="list" stripedRows dataKey="id" scrollable v-model:filters="filters" filterDisplay="row">
      <template #empty>
        <div class="text-center">No Users found.</div>
      </template>
      <Column
        field="name"
        header="Name"
        class="whitespace-nowrap min-w-56"
        :show-filter-menu="false"
        :showClearButton="false"
      >
        <template #body="{ data }">
          {{ data?.name }}
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
        field="email"
        header="Email"
        class="whitespace-nowrap min-w-56"
        :show-filter-menu="false"
        :showClearButton="false"
      >
        <template #body="{ data }">
          {{ data?.email }}
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
        field="phone_number"
        header="Phone#"
        class="whitespace-nowrap min-w-56"
        :show-filter-menu="false"
        :showClearButton="false"
      >
        <template #body="{ data }">
          {{ data?.phone_number }}
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
      <Column field="profile_picture" header="Image">
        <template #body="{ data }">
          <Avatar :image="imgUrl + data?.profile_picture" shape="circle" size="small" />
        </template>
      </Column>
      <Column field="roles" header="Role" class="whitespace-nowrap">
        <template #body="{ data }">
          <Tag v-for="role in data.roles || []" :key="role.id" severity="primary">
            {{ role?.name }}
          </Tag>
        </template>
      </Column>
      <Column field="status" header="status" class="whitespace-nowrap">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 0 ? 'error' : 'info'">
            {{ data.status === 1 ? 'Active' : 'Disable' }}
          </Tag>
        </template>
      </Column>
      <Column field="address" header="Address" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.address + ' ' + data?.city + ' ' + data?.state + ' ' + data?.country }}
        </template>
      </Column>
      <Column field="created_by" header="Auther" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.created_by }}
        </template>
      </Column>
      <Column field="created_at" header="Created At" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.created_at }}
        </template>
      </Column>
      <Column
        header="Actions"
        v-permission="{ action: ['user update', 'user delete', 'user assign permission'] }"
        class="whitespace-nowrap"
      >
        <template #body="{ data }">
          <Button
            label="Assign Permission"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="router.push({ name: 'user_assign_permission', params: { userId: data?.id } })"
            v-permission="{ action: ['user assign permission'] }"
          />
          <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="openEditDialog(data)"
            v-permission="{ action: ['user update'] }"
          />
          <Button
            label="Delete"
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
    <Paginator
      :rows="limit"
      :totalRecords="itemCount"
      :rowsPerPageOptions="pageSizes"
      @page="handlePageChange"
      template="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown JumpToPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
    />

    <AddUser
      v-model:visible="addDialog"
      :data="selectedUser"
      :isEdit="isEdit"
      @saved="handleSaved"
    />

    <DeleteUser
      v-model:visible="delDialog"
      :userId="deleteId"
      :userEmail="selectedUser?.email"
      @deleted="handleDeleted"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { FilterMatchMode } from '@primevue/core/api';
import { Avatar, Column, DataTable, Tag, Button, InputText, Paginator } from 'primevue';
import { usePagination } from '@/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';
import { useEnv } from '@/hooks/useEnv';
import AddUser from './components/AddUser.vue';
import DeleteUser from './components/DeleteUser.vue';

const { imgUrl } = useEnv();
const router = useRouter();
const addDialog: Ref<boolean> = ref(false);
const delDialog: Ref<boolean> = ref(false);
const deleteId: Ref<number | undefined> = ref();
const selectedUser: Ref<any> = ref(null);
const isEdit: Ref<boolean> = ref(false);

const { getList, list, pageSizes, itemCount, limit, handlePageChange, searchParams } = usePagination('/users');

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phone_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const fetchList = () => {
  searchParams.value = {
    name: filters.value.name.value || '',
    email: filters.value.email.value || '',
    phone: filters.value.phone_number.value || '',
  };
  getList();
};

const debouncedFetchList = debounce(fetchList, 1000);

watch(filters, debouncedFetchList, { deep: true });

onMounted(() => {
  fetchList();
});

function openAddDialog() {
  isEdit.value = false;
  selectedUser.value = null;
  addDialog.value = true;
}

function openEditDialog(item: any) {
  isEdit.value = true;
  selectedUser.value = {
    ...item,
    roles: item.roles.map((v: any) => v.id),
  };
  addDialog.value = true;
}

function openDeleteDialog(item: any) {
  deleteId.value = item.id;
  selectedUser.value = item;
  delDialog.value = true;
}

function handleSaved() {
  getList();
}

function handleDeleted() {
  getList();
  deleteId.value = undefined;
  selectedUser.value = null;
}
</script>

<style lang="css" scoped></style>
