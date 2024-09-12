<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Permission List</h1>
      <Button
        @click="openAddPermissionDialog"
        severity="primary"
        label="Add Permission"
        icon="pi pi-plus"
      />
    </div>

    <div class="table_content_container">
      <DataTable
        v-model:filters="filters"
        :value="list"
        dataKey="id"
        filterDisplay="row"
        stripedRows
        paginator
        :rows="20"
        :rowsPerPageOptions="pageSizes"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Permissions`"
      >
        <template #empty> No permissions found. </template>
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
        <Column
          field="type"
          header="Permission Type"
          :show-filter-menu="false"
          :showClearButton="false"
        >
          <template #body="{ data }">
            <Tag :value="data.type" :severity="data.type === 'private' ? 'danger' : 'info'" />
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by Type"
              class="w-full"
            />
          </template>
        </Column>
        <Column header="Actions">
          <template #body="{ data }">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="openEditPermissionDialog(data)"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="openDeletePermissionDialog(data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="addDialog" class="w-1/3" header="Add Permission" :modal="true">
      <div class="flex flex-col gap-6">
        <div>
          <label for="name" class="block font-bold mb-3">Name</label>
          <InputText
            id="name"
            v-model.trim="data.name"
            required="true"
            :invalid="submitted && !data.name"
            fluid
          />
          <small v-if="submitted && !data.name" class="text-red-500">Name is required.</small>
        </div>
        <div>
          <label for="permission_type" class="block font-bold mb-3">Permission Type</label>
          <Select
            id="permission_type"
            v-model="data.type"
            :options="permissionType"
            optionLabel="label"
            optionValue="key"
            placeholder="Select Permission Type"
            fluid
          ></Select>
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hidePermissionDialog" />
        <Button label="Save" icon="pi pi-check" @click="savePermissionForm" />
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
        <Button label="Yes" icon="pi pi-check" severity="danger" @click="handleDeletePermission" />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, watch, mergeProps } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { createRecordApi, deleteRecordApi, updateRecordApi } from '@src/api/endpoints';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';

const data: Ref = ref({});
const submitted: Ref = ref({});
const addDialog: Ref = ref(false);
const delDialog: Ref = ref(false);
const delId: Ref = ref();

const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/permission');

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  type: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const fetchList = () => {
  searchParams.value = {
    name: filters.value.name.value || '',
    type: filters.value.type.value || ''
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

function openAddPermissionDialog() {
  data.value = {};
  submitted.value = false;
  addDialog.value = true;
}

function openEditPermissionDialog(item: any) {
  data.value = item;
  submitted.value = false;
  addDialog.value = true;
}

function openDeletePermissionDialog(item: any) {
  delId.value = item.id;
  delDialog.value = true;
}

function hidePermissionDialog() {
  addDialog.value = false;
  submitted.value = false;
}

const savePermissionForm = () => {
  submitted.value = true;
  if (data?.value.name?.trim()) {
    if (data?.value.id) {
      updateRecordApi(`/permission/${data.value.id}`, data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    } else {
      createRecordApi('/permission', data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    }
    addDialog.value = false;
    data.value = {};
  }
};

function handleDeletePermission() {
  deleteRecordApi(`/permission/${delId.value}`)
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

const permissionType = [
  { label: 'Public', key: 'public' },
  { label: 'Private', key: 'private' }
];
</script>

<style lang="scss" scoped>
.table_content_container {
  @apply relative overflow-x-auto mt-5;
}
</style>
