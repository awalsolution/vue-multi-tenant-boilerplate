<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Role List</h1>
      <Button
        @click="openAddDialog"
        label="Add Role"
        icon="pi pi-plus"
        severity="primary"
        v-permission="{ action: ['role create'] }"
      />
    </div>

    <DataTable
      v-model:expandedRows="expandedRows"
      :value="list"
      stripedRows
      dataKey="id"
      v-model:filters="filters"
      filterDisplay="row"
    >
      <template #empty> No Roles found. </template>
      <Column expander style="width: 5rem" />
      <Column field="name" header="Name" :show-filter-menu="false" :showClearButton="false">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by Name"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column field="status" header="status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 0 ? 'error' : 'info'">
            {{ data.status === 1 ? 'Active' : 'Disable' }}
          </Tag>
        </template>
      </Column>
      <Column field="created_by" header="Auther">
        <template #body="{ data }">
          {{ data.created_by }}
        </template>
      </Column>
      <Column field="created_at" header="Created At">
        <template #body="{ data }">
          {{ data.created_at }}
        </template>
      </Column>
      <Column header="Actions" v-permission="{ action: ['role update', 'role delete', 'role assign permission'] }">
        <template #body="{ data }">
          <Button
            label="Assign Permission"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="router.push({ name: 'role_assign_permission', params: { roleId: data?.id } })"
            v-permission="{ action: ['role assign permission'] }"
          />
          <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="openEditDialog(data)"
            v-permission="{
              action: ['role update'],
            }"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
            v-permission="{
              action: ['role delete'],
            }"
          />
        </template>
      </Column>
      <template #expansion="slotProps">
        <DataTable :value="slotProps.data.permissions">
          <Column field="name" header="Name">
            <template #body="{ data }">
              {{ data.name }}
            </template>
          </Column>
          <Column field="type" header="Permission Type">
            <template #body="{ data }">
              <Tag :value="data.type" :severity="data.type === 'private' ? 'danger' : 'info'" />
            </template>
          </Column>
          <Column field="status" header="status">
            <template #body="{ data }">
              <Tag :value="data.status" :severity="data.status === 0 ? 'error' : 'info'">
                {{ data.status === 1 ? 'Active' : 'Disable' }}
              </Tag>
            </template>
          </Column>
          <Column field="created_by" header="Auther">
            <template #body="{ data }">
              {{ data.created_by }}
            </template>
          </Column>
          <Column field="created_at" header="Created At">
            <template #body="{ data }">
              {{ data.created_at }}
            </template>
          </Column>
        </DataTable>
      </template>
    </DataTable>

    <Paginator
      :rows="limit"
      :totalRecords="itemCount"
      :rowsPerPageOptions="pageSizes"
      @page="handlePageChange"
      template="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown JumpToPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
    />

    <AddRole v-model:visible="addDialog" :data="selectedRole" :isEdit="isEdit" @saved="handleSaved" />

    <DeleteRole
      v-model:visible="delDialog"
      :roleId="deleteId"
      :roleName="selectedRole?.name"
      @deleted="handleDeleted"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { FilterMatchMode } from '@primevue/core/api';
import { Column, DataTable, Tag, Button, InputText, Paginator } from 'primevue';
import { usePagination } from '@/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';
import AddRole from './components/AddRole.vue';
import DeleteRole from './components/DeleteRole.vue';

const router = useRouter();
const expandedRows: Ref = ref({});
const addDialog: Ref<boolean> = ref(false);
const delDialog: Ref<boolean> = ref(false);
const deleteId: Ref<number | undefined> = ref();
const selectedRole: Ref<any> = ref(null);
const isEdit: Ref<boolean> = ref(false);

const { getList, list, pageSizes, itemCount, limit, handlePageChange, searchParams } = usePagination('/roles');

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const fetchList = () => {
  searchParams.value = {
    name: filters.value.name.value || '',
  };
  getList();
};

// Debounce fetchList by 1 second
const debouncedFetchList = debounce(fetchList, 1000);

// Watch filters and call the debounced function when they change
watch(filters, debouncedFetchList, { deep: true });

onMounted(() => {
  fetchList();
});

function openAddDialog() {
  isEdit.value = false;
  selectedRole.value = null;
  addDialog.value = true;
}

function openEditDialog(item: any) {
  isEdit.value = true;
  selectedRole.value = item;
  addDialog.value = true;
}

function openDeleteDialog(item: any) {
  deleteId.value = item.id;
  selectedRole.value = item;
  delDialog.value = true;
}

function handleSaved() {
  getList();
}

function handleDeleted() {
  getList();
  deleteId.value = undefined;
  selectedRole.value = null;
}
</script>

<style lang="css" scoped></style>
