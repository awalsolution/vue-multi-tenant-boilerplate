<template>
  <div>
    <div class="flex justify-between mb-3">
      <h2 class="text-xl">Permission List</h2>
      <NButton
        primary
        type="primary"
        size="medium"
        :round="true"
        @click="showModal = true"
        v-permission="{ action: ['permission create'] }"
      >
        Add Permission
      </NButton>
    </div>
    <!-- table filters start -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <n-input
        v-model:value="searchParams.name"
        clearable
        placeholder="Search by name"
        size="medium"
        type="text"
        :theme-overrides="{ border: 'transparent', borderRadius: '25px' }"
      />
      <n-input
        v-model:value="searchParams.name"
        clearable
        placeholder="Search by name"
        size="medium"
        type="text"
        :theme-overrides="{ border: 'transparent', borderRadius: '25px' }"
      />
      <n-input
        v-model:value="searchParams.name"
        clearable
        placeholder="Search by name"
        size="medium"
        type="text"
        :theme-overrides="{ border: 'transparent', borderRadius: '25px' }"
      />
      <n-input
        v-model:value="searchParams.name"
        clearable
        placeholder="Search by name"
        size="medium"
        type="text"
        :theme-overrides="{ border: 'transparent', borderRadius: '25px' }"
      />
      <n-input
        v-model:value="searchParams.name"
        clearable
        placeholder="Search by name"
        size="medium"
        type="text"
        :theme-overrides="{ border: 'transparent', borderRadius: '25px' }"
      />
      <div>
        <NButton primary type="primary" size="medium" :round="true" @click="fetchList">
          Search
        </NButton>
      </div>
    </div>
    <!-- table filters end -->
    <div class="table_content_container">
      <n-table class="table rounded-lg" striped>
        <thead class="head">
          <tr>
            <th class="th">Permission Name</th>
            <th class="th">Permission Type</th>
            <th class="th">Created At</th>
            <th
              class="sticky_el right-0 z-20"
              v-permission="{
                action: ['permission update', 'permission delete']
              }"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="list.length === 0">
            <td colspan="7" class="data_placeholder">Record Not Exist</td>
          </tr>
          <tr v-else v-for="item in list" :key="item.id">
            <td class="td">{{ item.name }}</td>
            <td class="text-center td">
              <n-tag :bordered="false" :type="item.type === 'private' ? 'error' : 'info'"
                >{{ item.type }}
              </n-tag>
            </td>
            <td class="td">{{ item.created_at }}</td>
            <td
              class="sticky_el right-0 z-10"
              v-permission="{
                action: ['permission update', 'permission delete']
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
      </n-table>
    </div>
    <n-pagination
      v-model:page="page"
      v-model:page-size="perPage"
      :item-count="itemCount"
      :page-sizes="pageSizes"
      size="small"
      :show-quick-jumper="true"
      :show-size-picker="true"
    >
      <template #prefix="{ itemCount }"> Total Permissions: {{ itemCount }} </template>
    </n-pagination>

    <n-modal v-model:show="showModal" preset="dialog">
      <template #header>
        <div>Create New Permission</div>
      </template>
      <n-space :vertical="true">
        <add-permission
          @created="
            getList();
            showModal = false;
          "
        />
      </n-space>
    </n-modal>

    <n-modal v-model:show="showEditModal" preset="dialog">
      <template #header>
        <div>Update Permission</div>
      </template>
      <n-space :vertical="true">
        <edit-permission
          :id="selectedId"
          @updated="
            getList();
            showEditModal = false;
          "
        />
      </n-space>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, type Ref } from 'vue';
import { useDialog, NButton } from 'naive-ui';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@vicons/antd';
import { deleteRecordApi } from '@src/api/endpoints';
import { usePermission } from '@src/hooks/permission/usePermission';
import { usePagination } from '@src/hooks/pagination/usePagination';
import AddPermission from '@src/components/permission/AddPermission.vue';
import EditPermission from '@src/components/permission/EditPermission.vue';
import { renderIcon } from '@src/utils/renderIcon';

const dialog = useDialog();
const showModal: Ref = ref(false);
const selectedOption: Ref = ref(null);
const showEditModal: Ref = ref(false);
const selectedId: Ref = ref();
const { hasPermission } = usePermission();

const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/permission');

onMounted(() => {
  getList();
});

const moreOptions = ref([
  {
    label: 'Edit',
    key: 'edit',
    icon: renderIcon(EditOutlined),
    permission: hasPermission(['permission update'])
  },
  {
    label: 'Delete',
    key: 'delete',
    icon: renderIcon(DeleteOutlined),
    permission: hasPermission(['permission delete'])
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
  deleteRecordApi(`/permission/${selectedId.value}`)
    .then((res: any) => {
      window['$message'].success(res.message);
      getList();
      dialog.destroyAll;
    })
    .catch((res) => {
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
  @apply relative overflow-x-auto mt-3;
}
.table {
  @apply w-full;
}
.th {
  @apply p-3 whitespace-nowrap;
}
.td {
  @apply p-3 whitespace-nowrap;
}

.data_placeholder {
  @apply text-center text-gray-400 py-5 text-lg italic;
}
</style>
