<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Organization List</h1>
      <Button
        @click="router.push({ name: 'organization_add' })"
        severity="primary"
        label="Add Organization"
        icon="pi pi-plus"
        v-permission="{ action: ['tenant create'] }"
      />
    </div>
    <DataTable
      class=""
      :value="list"
      stripedRows
      dataKey="id"
      scrollable
      paginator
      :rows="20"
      :rowsPerPageOptions="pageSizes"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Organizations`"
    >
      <template #empty> <div class="text-center">No Organizations found.</div> </template>
      <Column field="logo" header="Logo" class="">
        <template #body="{ data }">
          <Avatar :image="imgUrl + data?.logo" shape="circle" size="large" />
        </template>
      </Column>
      <Column field="tenant_name" header="Name" class="whitespace-nowrap">
        <template #body="{ data }">
          <RouterLink
            :to="{ name: 'organization_edit', params: { tenantId: data?.id } }"
            class="text-primary"
          >
            {{ data?.tenant_name }}
          </RouterLink>
        </template>
      </Column>
      <Column field="domain_name" header="Domain" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.domain_name }}
        </template>
      </Column>
      <Column field="phone_number" header="Phone#" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.phone_number }}
        </template>
      </Column>
      <Column field="status" header="status" class="whitespace-nowrap">
        <template #body="{ data }">
          <Tag :severity="data.status === 0 ? 'error' : 'info'">
            {{ data.status === 1 ? 'Active' : 'Disable' }}
          </Tag>
        </template>
      </Column>
      <Column field="plan" header="Plan" class="whitespace-nowrap">
        <template #body="{ data }">
          <Tag severity="primary">
            {{ data.plan?.name }}
          </Tag>
        </template>
      </Column>
      <Column field="db_name" header="Database" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.db_name }}
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
        v-permission="{ action: ['tenant update', 'tenant delete'] }"
        class="whitespace-nowrap"
      >
        <template #body="{ data }">
          <Button
            v-tooltip.top="'Edit Tenant'"
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="router.push({ name: 'organization_edit', params: { tenantId: data?.id } })"
            v-permission="{ action: ['tenant update'] }"
          />
          <Button
            disabled
            v-tooltip.top="'Delete Tenant'"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
            v-permission="{ action: ['tenant delete'] }"
          />
        </template>
      </Column>
    </DataTable>

    <!-- delete form -->
    <Dialog v-model:visible="showDeleteDialog" class="w-1/3" header="Confirm" :modal="true">
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span> Are you sure you want to delete ? </span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="showDeleteDialog = false" />
        <Button label="Yes" icon="pi pi-check" severity="danger" @click="handleDelete" />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { deleteRecordApi } from '@src/api/endpoints';
import { useEnv } from '@src/hooks/useEnv';
import DataTable from 'primevue/datatable';
import Avatar from 'primevue/avatar';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';

const { imgUrl } = useEnv();
const router = useRouter();
const deleteId: Ref = ref();
const showDeleteDialog: Ref = ref(false);

// fetch all records
const { getList, list, page, pageSizes, itemCount, perPage }: any = usePagination('/tenants');

onMounted(() => {
  getList();
});

function openDeleteDialog(item: any) {
  deleteId.value = item.id;
  showDeleteDialog.value = true;
}

function handleDelete() {
  deleteRecordApi(`/tenants/${deleteId.value}`)
    .then((res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    })
    .catch((res) => {
      window.toast('error', 'Error Message', res.message);
    });
  showDeleteDialog.value = false;
  deleteId.value = null;
}
</script>

<style lang="scss" scoped></style>
