<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Plan List</h1>
      <Button @click="openAddDialog" severity="primary" label="Add Plan" icon="pi pi-plus" />
    </div>
    <DataTable
      class=""
      :value="list"
      stripedRows
      dataKey="id"
      v-model:filters="filters"
      filterDisplay="row"
      paginator
      :rows="20"
      :rowsPerPageOptions="pageSizes"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Plans`"
    >
      <template #empty> No Plans found. </template>
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
          {{ data.type }}
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
      <Column header="Actions">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="openEditDialog(data)" />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
          />
        </template>
      </Column>
    </DataTable>
    <Dialog v-model:visible="addDialog" class="w-1/3" :header="dialogHeader" :modal="true">
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
          <label for="price" class="block font-bold mb-3">Price</label>
          <InputText
            id="price"
            v-model.trim="data.price"
            required="true"
            :invalid="submitted && !data.price"
            fluid
          />
          <small v-if="submitted && !data.price" class="text-red-500">Price is required.</small>
        </div>
        <div>
          <label for="type" class="block font-bold mb-3">Type</label>
          <InputText
            id="type"
            v-model.trim="data.type"
            required="true"
            :invalid="submitted && !data.type"
            fluid
          />
          <small v-if="submitted && !data.type" class="text-red-500">Type is required.</small>
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
import { createRecordApi, deleteRecordApi, updateRecordApi } from '@src/api/endpoints';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';

const data: Ref = ref({});
const submitted: Ref = ref({});
const addDialog: Ref = ref(false);
const delDialog: Ref = ref(false);
const dialogHeader: Ref = ref();
const delId: Ref = ref();

const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/plan');

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  price: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const fetchList = () => {
  searchParams.value = {
    name: filters.value.name.value || '',
    price: filters.value.price.value || ''
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
  dialogHeader.value = 'Add Plan';
  data.value = {};
  submitted.value = false;
  addDialog.value = true;
}

function openEditDialog(item: any) {
  dialogHeader.value = 'Edit Plan';
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
  if (data?.value.name?.trim() && data?.value.price?.trim() && data?.value.type?.trim()) {
    if (data?.value.id) {
      updateRecordApi(`/plan/${data.value.id}`, data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    } else {
      createRecordApi('/plan', data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    }
    addDialog.value = false;
    data.value = {};
  }
};

function handleDelete() {
  deleteRecordApi(`/plan/${delId.value}`)
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
    <n-card title="Role List">
      <template #header-extra>
        <NButton
          secondary
          type="info"
          size="small"
          @click="showModal = true"
          v-permission="{ action: ['plan create'] }"
        >
          Add Plan
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
        <n-button secondary size="small" strong type="info" @click="fetchList"> Search </n-button>
      </div>
      <div class="table_content_container">
        <table class="table">
          <thead class="head">
            <tr>
              <th class="th">Name</th>
              <th class="th">Price</th>
              <th class="th">Type</th>
              <th class="th">Description</th>
              <th class="th">Created At</th>
              <th
                class="sticky_el right-0 z-20"
                v-permission="{
                  action: ['plan update', 'plan delete']
                }"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="list.length === 0">
              <td colspan="10" class="data_placeholder">Record Not Exist</td>
            </tr>
            <tr v-else v-for="item in list" :key="item.id" class="body_tr">
              <td class="td">{{ item.name }}</td>
              <td class="td">{{ item.price }}</td>
              <td class="td">{{ item.type }}</td>
              <td class="td">{{ item.description }}</td>
              <td class="td">{{ item.created_at }}</td>
              <td
                class="sticky_el right-0 z-10"
                v-permission="{
                  action: ['plan update', 'plan delete']
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
        <template #prefix="{ itemCount }"> Total Plans: {{ itemCount }} </template>
      </n-pagination>
    </n-card>
    <n-modal v-model:show="showModal" preset="dialog">
      <template #header>
        <div>Create New Plan</div>
      </template>
      <n-space :vertical="true">
        <add-plan
          @created="
            getList();
            showModal = false;
          "
        />
      </n-space>
    </n-modal>

    <n-modal v-model:show="showEditModal" preset="dialog">
      <template #header>
        <div>Update Plan</div>
      </template>
      <n-space :vertical="true">
        <edit-plan
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
import { NIcon, NPagination, useDialog } from 'naive-ui';
import { MoreOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@vicons/antd';
import { deleteRecordApi } from '@src/api/endpoints';
import { renderIcon } from '@src/utils/renderIcon';
import { usePermission } from '@src/hooks/permission/usePermission';
import { usePagination } from '@src/hooks/pagination/usePagination';
import AddPlan from '@src/components/plan/AddPlan.vue';
import EditPlan from '@src/components/plan/EditPlan.vue';

const dialog = useDialog();
const selectedOption: Ref = ref(null);
const showModal: Ref = ref(false);
const showEditModal: Ref = ref(false);
const selectedId: Ref = ref();
const { hasPermission } = usePermission();

// fetch all records
const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/plan');

onMounted(() => {
  getList();
});

const moreOptions = ref([
  {
    label: 'Edit',
    key: 'edit',
    icon: renderIcon(EditOutlined),
    permission: hasPermission(['plan update'])
  },
  {
    label: 'Delete',
    key: 'delete',
    icon: renderIcon(DeleteOutlined),
    permission: hasPermission(['plan delete'])
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
  deleteRecordApi(`/plan/${selectedId.value}`)
    .then((res: any) => {
      window['$message'].warning(res.message);
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
  if (selectedOption.value === 'edit') {
    showEditModal.value = true;
    selectedId.value = item.id;
    // router.push(`/roles/${item.id}`);
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
</style> -->
