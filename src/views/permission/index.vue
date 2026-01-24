<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Permission List</h1>
      <Button
        @click="openAddDialog"
        severity="primary"
        label="Add Permission"
        icon="pi pi-plus"
        v-permission="{ action: ['permission create'] }"
      />
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
      :actionsPermissions="['permission update', 'permission delete']"
      emptyMessage="No permissions found."
      @page-change="handlePageChange"
    />

    <AddPermissionDialog
      v-model:visible="addDialog"
      :data="selectedPermission"
      :isEdit="isEdit"
      @saved="handleSaved"
    />

    <DeletePermissionDialog
      v-model:visible="delDialog"
      :permissionId="deleteId"
      :permissionName="selectedPermission?.name"
      @deleted="handleDeleted"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, h } from 'vue';
import { Tag, Button } from 'primevue';
import { usePagination } from '@/hooks/pagination/usePagination';
import { DataTable } from '@/components/ui/data-table';
import type { ColumnDefinition, ActionButton } from '@/components/ui/data-table';
import AddPermissionDialog from './components/AddPermissionDialog.vue';
import DeletePermissionDialog from './components/DeletePermissionDialog.vue';

const addDialog: Ref<boolean> = ref(false);
const delDialog: Ref<boolean> = ref(false);
const deleteId: Ref<number | undefined> = ref();
const selectedPermission: Ref<any> = ref(null);
const isEdit: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);

const { getList, list, pageSizes, itemCount, limit, handlePageChange } = usePagination('/permissions');

const columns: ColumnDefinition[] = [
  {
    field: 'name',
    header: 'Name',
  },
  {
    field: 'type',
    header: 'Permission Type',
    body: (data: any) =>
      h(Tag, {
        value: data.type,
        severity: data.type === 'private' ? 'danger' : 'info',
      }),
  },
  {
    field: 'status',
    header: 'Status',
    body: (data: any) =>
      h(
        Tag,
        {
          value: data.status,
          severity: data.status === 0 ? 'error' : 'info',
        },
        () => (data.status === 1 ? 'Active' : 'Disable'),
      ),
  },
  {
    field: 'created_by',
    header: 'Author',
  },
  {
    field: 'created_at',
    header: 'Created At',
  },
];

const actions: ActionButton[] = [
  {
    label: 'Edit',
    icon: 'pi pi-pen-to-square',
    outlined: true,
    rounded: true,
    permissions: ['permission update'],
    onClick: (data: any) => openEditDialog(data),
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    outlined: true,
    rounded: true,
    severity: 'danger',
    disabled: true,
    permissions: ['permission delete'],
    onClick: (data: any) => openDeleteDialog(data),
  },
];

onMounted(() => {
  getList();
});

function openAddDialog() {
  isEdit.value = false;
  selectedPermission.value = null;
  addDialog.value = true;
}

function openEditDialog(item: any) {
  isEdit.value = true;
  selectedPermission.value = item;
  addDialog.value = true;
}

function openDeleteDialog(item: any) {
  deleteId.value = item.id;
  selectedPermission.value = item;
  delDialog.value = true;
}

function handleSaved() {
  getList();
}

function handleDeleted() {
  getList();
  deleteId.value = undefined;
  selectedPermission.value = null;
}
</script>

<style lang="css" scoped></style>
