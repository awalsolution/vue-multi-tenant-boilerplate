<template>
  <div class="p-6">
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-surface-900">User Management</h1>
        <p class="text-surface-500">Manage your organization's users and their roles.</p>
      </div>
      <Button
        @click="openAddDialog"
        severity="primary"
        label="Add New User"
        icon="pi pi-plus"
        class="rounded"
        v-permission="{ action: ['user create'] }"
      />
    </div>

    <div class="bg-surface-card p-4 rounded border border-surface-200 mb-6 flex flex-wrap gap-4 items-end">
      <div class="flex flex-col gap-2 min-w-[200px] flex-1">
        <label class="text-xs font-semibold text-surface-500 uppercase">Search Name</label>
        <InputText v-model="filters.name.value" placeholder="Search by name..." class="rounded w-full" />
      </div>
      <div class="flex flex-col gap-2 min-w-[200px] flex-1">
        <label class="text-xs font-semibold text-surface-500 uppercase">Search Email</label>
        <InputText v-model="filters.email.value" placeholder="Search by email..." class="rounded w-full" />
      </div>
      <div class="flex flex-col gap-2 min-w-[200px] flex-1">
        <label class="text-xs font-semibold text-surface-500 uppercase">Search Phone</label>
        <InputText v-model="filters.phone_number.value" placeholder="Search by phone..." class="rounded w-full" />
      </div>
    </div>

    <DataTable
      :value="list"
      :columns="columns"
      :actions="actions"
      :loading="loading"
      :totalRecords="itemCount"
      :rows="limit"
      :rowsPerPageOptions="pageSizes"
      dataKey="id"
      actionsLabel="Actions"
      :actionsPermissions="['user update', 'user delete', 'user assign permission']"
      emptyMessage="No users found."
      @page-change="handlePageChange"
    />

    <AddUser v-model:visible="addDialog" :data="selectedUser" :isEdit="isEdit" @saved="handleSaved" />

    <DeleteUser
      v-model:visible="delDialog"
      :userId="deleteId"
      :userEmail="selectedUser?.email"
      @deleted="handleDeleted"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, watch, h } from 'vue';
import { useRouter } from 'vue-router';
import { FilterMatchMode } from '@primevue/core/api';
import { Tag, Avatar } from 'primevue';
import { usePagination } from '@/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';
import { useEnv } from '@/hooks/useEnv';
import { DataTable } from '@/components/ui/data-table';
import type { ColumnDefinition, ActionButton } from '@/components/ui/data-table/types';
import AddUser from './components/AddUser.vue';
import DeleteUser from './components/DeleteUser.vue';

const { imgUrl } = useEnv();
const router = useRouter();
const addDialog: Ref<boolean> = ref(false);
const delDialog: Ref<boolean> = ref(false);
const deleteId: Ref<number | undefined> = ref();
const selectedUser: Ref<any> = ref(null);
const isEdit: Ref<boolean> = ref(false);
const loading = ref(false);

const { getList, list, pageSizes, itemCount, limit, handlePageChange, searchParams } = usePagination('/users');

const filters = ref({
  name: { value: '', matchMode: FilterMatchMode.CONTAINS },
  email: { value: '', matchMode: FilterMatchMode.CONTAINS },
  phone_number: { value: '', matchMode: FilterMatchMode.CONTAINS },
});

const columns: ColumnDefinition[] = [
  {
    field: 'name',
    header: 'User',
    class: 'min-w-[250px]',
    body: (data: any) =>
      h('div', { class: 'flex items-center gap-3' }, [
        h(Avatar, { image: imgUrl + data?.profile_picture, shape: 'circle', size: 'normal' }),
        h('div', { class: 'flex flex-col' }, [
          h('span', { class: 'font-semibold text-surface-900' }, data.name),
          h('span', { class: 'text-xs text-surface-500' }, data.email),
        ]),
      ]),
  },
  {
    field: 'phone_number',
    header: 'Phone Number',
    class: 'min-w-[150px]',
  },
  {
    field: 'roles',
    header: 'Roles',
    body: (data: any) =>
      h(
        'div',
        { class: 'flex flex-wrap gap-1' },
        (data.roles || []).map((role: any) => h(Tag, { value: role.name, severity: 'primary' })),
      ),
  },
  {
    field: 'status',
    header: 'Status',
    body: (data: any) =>
      h(Tag, {
        value: data.status === 1 ? 'Active' : 'Disabled',
        severity: data.status === 1 ? 'success' : 'danger',
      }),
  },
  {
    field: 'created_at',
    header: 'Joined On',
    class: 'min-w-[150px]',
    format: 'date',
  },
];

const actions: ActionButton[] = [
  {
    label: 'Permissions',
    icon: 'pi pi-shield',
    outlined: true,
    rounded: true,
    permissions: ['user assign permission'],
    onClick: (data: any) => router.push({ name: 'user_assign_permission', params: { userId: data?.id } }),
  },
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    outlined: true,
    rounded: true,
    severity: 'info',
    permissions: ['user update'],
    onClick: (data: any) => openEditDialog(data),
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    outlined: true,
    rounded: true,
    severity: 'danger',
    permissions: ['user delete'],
    onClick: (data: any) => openDeleteDialog(data),
  },
];

const fetchList = async () => {
  loading.value = true;
  searchParams.value = {
    name: filters.value.name.value || '',
    email: filters.value.email.value || '',
    phone: filters.value.phone_number.value || '',
  };
  await getList();
  loading.value = false;
};

const debouncedFetchList = debounce(fetchList, 500);

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
  fetchList();
}

function handleDeleted() {
  fetchList();
  deleteId.value = undefined;
  selectedUser.value = null;
}
</script>

<style scoped>
@reference "../../assets/css/main.css";
:deep(.p-datatable-thead > tr > th) {
  @apply bg-surface-50 text-surface-700 font-bold uppercase text-xs;
}
</style>
