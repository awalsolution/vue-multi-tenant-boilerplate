<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Plan List</h1>
      <Button
        @click="openAddDialog"
        severity="primary"
        label="Add Plan"
        icon="pi pi-plus"
        v-permission="{
          action: ['plan create'],
        }"
      />
    </div>
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="list"
      stripedRows
      dataKey="id"
      v-model:filters="filters"
      filterDisplay="row"
      scrollable
    >
      <template #empty> No Plans found. </template>
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
      <Column field="price" header="Price">
        <template #body="{ data }">
          {{ data.price }}
        </template>
      </Column>
      <Column field="type" header="Type">
        <template #body="{ data }">
          <Tag severity=" primary">
            {{ data.type }}
          </Tag>
        </template>
      </Column>
      <Column field="status" header="status">
        <template #body="{ data }">
          <Tag :severity="data.status === 0 ? 'danger' : 'primary'">
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
      <Column header="Actions" v-permission="{ action: ['plan update', 'plan delete'] }" class="whitespace-nowrap">
        <template #body="{ data }">
          <Button
            label="Assign Permission"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="router.push({ name: 'plan_assign_permission', params: { planId: data?.id } })"
            v-permission="{ action: ['plan assign permission'] }"
          />
          <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="openEditDialog(data)"
            v-permission="{
              action: ['plan update'],
            }"
          />
          <Button
            disabled
            label="Delete"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
            v-permission="{
              action: ['plan delete'],
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

    <AddPlan
      v-model:visible="addDialog"
      :data="selectedPlan"
      :isEdit="isEdit"
      @saved="handleSaved"
    />

    <DeletePlan
      v-model:visible="delDialog"
      :planId="deleteId"
      :planName="selectedPlan?.name"
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
import AddPlan from './components/AddPlan.vue';
import DeletePlan from './components/DeletePlan.vue';

const expandedRows = ref({});
const router = useRouter();
const addDialog: Ref<boolean> = ref(false);
const delDialog: Ref<boolean> = ref(false);
const deleteId: Ref<number | undefined> = ref();
const selectedPlan: Ref<any> = ref(null);
const isEdit: Ref<boolean> = ref(false);

const { getList, list, pageSizes, itemCount, limit, handlePageChange, searchParams } = usePagination('/plans');

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  price: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const fetchList = () => {
  searchParams.value = {
    name: filters.value.name.value || '',
    price: filters.value.price.value || '',
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
  selectedPlan.value = null;
  addDialog.value = true;
}

function openEditDialog(item: any) {
  isEdit.value = true;
  selectedPlan.value = item;
  addDialog.value = true;
}

function openDeleteDialog(item: any) {
  deleteId.value = item.id;
  selectedPlan.value = item;
  delDialog.value = true;
}

function handleSaved() {
  getList();
}

function handleDeleted() {
  getList();
  deleteId.value = undefined;
  selectedPlan.value = null;
}
</script>

<style lang="css" scoped></style>
