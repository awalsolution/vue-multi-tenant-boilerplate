<template>
  <n-card :loading="loading" title="Categories" v-permission="{ action: ['can view categories'] }">
    <n-space :vertical="true">
      <n-input
        type="text"
        size="small"
        v-model:value="searchParams.name"
        @change="fetchList"
        placeholder="Email"
      />
      <n-table :bordered="true" :single-line="false" size="small" :striped="true">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th
              class="text_center"
              v-permission="{
                action: ['can view category update', 'can view category delete'],
              }"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="list.length === 0">
            <td colspan="4" class="data_placeholder"> Record Not Exist </td>
          </tr>
          <tr v-else v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td class="text-center">
              <n-avatar round size="large" :src="`${imgUrl}${item.image}`" />
            </td>
            <td>{{ item.created_at }}</td>
            <td>{{ item.updated_at }}</td>
            <td
              class="text-center"
              v-permission="{
                action: ['can view category update', 'can view category delete'],
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
      <n-pagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :item-count="itemCount"
        :page-sizes="pageSizes"
        size="small"
        :show-quick-jumper="true"
        :show-size-picker="true"
      />
      <n-button
        type="primary"
        size="large"
        :circle="true"
        style="position: fixed; bottom: 30px; right: 40px"
        @click="showModal = true"
        v-permission="{ action: ['can view category create'] }"
      >
        <template #icon>
          <n-icon>
            <plus-outlined />
          </n-icon>
        </template>
      </n-button>
      <n-modal v-model:show="showModal" preset="dialog">
        <template #header>
          <div>Create New Category</div>
        </template>
        <n-space :vertical="true">
          <add-category
            @created="
              getList();
              showModal = false;
            "
          />
        </n-space>
      </n-modal>

      <n-modal v-model:show="showEditModal" preset="dialog">
        <template #header>
          <div>Update Category</div>
        </template>
        <n-space :vertical="true">
          <edit-category
            :id="selectedId"
            @updated="
              getList();
              showEditModal = false;
            "
          />
        </n-space>
      </n-modal>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
  import { deleteRecordApi, getRecordsApi } from '@src/api/endpoints';
  import { usePermission } from '@src/utils/permission/usePermission';
  import { ref, onMounted, h, computed } from 'vue';
  import type { Component } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';
  import { NIcon, NPagination } from 'naive-ui';
  import { MoreOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@vicons/antd';
  import { usePagination } from '@src/hooks/pagination/usePagination';
  import { useLoading } from '@src/hooks/useLoading';
  import { useEnv } from '@src/hooks/useEnv';
  import AddCategory from '@src/components/products/categories/AddCategory.vue';
  import EditCategory from '@src/components/products/categories/EditCategory.vue';

  const { imgUrl } = useEnv();
  const dialog = useDialog();
  const showModal = ref(false);
  const selectedOption: any = ref(null);
  const showEditModal = ref(false);
  const selectedId = ref();
  const { hasPermission } = usePermission();
  const message: any = useMessage();
  const searchParams: any = ref({});
  const [loading, loadingDispatcher] = useLoading(false);
  const page: any = ref(1);
  const pageSize = ref(10);
  const list: any = ref([]);
  const meta: any = ref({});
  const { pageSizes, itemCount }: any = usePagination(meta);

  // fetch all records
  const getList = (params?: any) => {
    getRecordsApi('/variants', { ...params }).then((res: any) => {
      list.value = res?.result?.data;
      meta.value = res?.result?.meta;
      console.log('record list => ', res.result);
    });
  };
  // on component reload
  onMounted(() => {
    getList({ page: page.value, pageSize: pageSize.value });
  });

  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };

  const moreOptions = ref([
    {
      label: 'Edit',
      key: 'edit',
      icon: renderIcon(EditOutlined),
      permission: hasPermission(['can view category update']),
    },
    {
      label: 'Delete',
      key: 'delete',
      icon: renderIcon(DeleteOutlined),
      permission: hasPermission(['can view category delete']),
    },
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
      onPositiveClick: deleteOperation,
    });
  }

  function deleteOperation() {
    loadingDispatcher.loading();
    deleteRecordApi(`/categories/${selectedId.value}`)
      .then((result: any) => {
        message.success(result.message);
        getList();
        loadingDispatcher.loaded();
        dialog.destroyAll;
      })
      .catch((result: any) => {
        message.error(result.message);
        loadingDispatcher.loaded();
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
  onMounted(() => {
    getList();
  });
</script>

<style lang="less" scoped>
  .text_center {
    text-align: center;
  }
  .data_placeholder {
    text-align: center;
    color: gray;
    padding: 20px 0;
    font-size: 18px;
    font-style: italic;
  }
</style>
