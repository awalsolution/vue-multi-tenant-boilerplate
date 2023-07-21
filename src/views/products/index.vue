<template>
  <n-card title="Products" v-permission="{ action: ['can view products'] }">
    <template #header-extra>
      <n-space>
        <n-button
          v-permission="{ action: ['can view product create'] }"
          type="success"
          @click="router.push({ name: 'product_add' })"
        >
          Add New
        </n-button>
        <n-button v-permission="{ action: ['can view product export'] }" type="success">
          Export
        </n-button>
        <n-button
          v-permission="{ action: ['can view product import'] }"
          type="success"
          icon-placement="left"
        >
          Import
          <template #icon>
            <n-icon :component="FileImport" />
          </template>
        </n-button>
      </n-space>
    </template>
    <n-space :vertical="true">
      <n-space>
        <n-tag :bordered="false" type="info">All (1000) </n-tag>
        <n-tag :bordered="false" type="success">Published (800)</n-tag>
        <n-tag :bordered="false" type="warning">Darft (200)</n-tag>
        <n-input
          type="text"
          placeholder="Search by Title"
          size="small"
          v-model:value="params.name"
          @change="fetchList"
        >
          <template #suffix><n-icon :component="Search20Regular" /></template>
        </n-input>
        <n-input
          type="text"
          placeholder="Search by SKU ID"
          size="small"
          v-model:value="params.name"
          @change="fetchList"
        >
          <template #suffix><n-icon :component="Search20Regular" /></template>
        </n-input>
        <n-input
          type="text"
          placeholder="Search by Price"
          size="small"
          v-model:value="params.name"
          @change="fetchList"
        >
          <template #suffix><n-icon :component="Search20Regular" /></template>
        </n-input>
      </n-space>
      <div class="overflow-x-scroll">
        <n-table :bordered="true" :single-line="false" size="small" :striped="true">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Vendor</th>
              <th>Title</th>
              <th>Product Code</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th
                v-permission="{
                  action: ['can view product update', 'can view product delete'],
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
              <td class="text-center">
                <n-avatar round size="large" :src="`${imgUrl}${item.product_image}`" />
              </td>
              <td>{{ item.shop.shop_name }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.product_code }}</td>
              <td>
                <n-tag :bordered="false" type="info">{{ item.status }}</n-tag>
              </td>
              <td>{{ item.created_at }}</td>
              <td>{{ item.updated_at }}</td>
              <td
                v-permission="{
                  action: ['can view product update', 'can view product delete'],
                }"
              >
                <n-dropdown
                  @click="actionOperation(item)"
                  :onSelect="selectedAction"
                  trigger="click"
                  :options="moreOptions"
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
      <n-space style="align-items: center; padding-top: 15px">
        <n-pagination
          v-model:page="page"
          v-model:page-size="pageSize"
          :item-count="itemCount"
          :page-sizes="pageSizes"
          size="small"
          :show-quick-jumper="true"
          :show-size-picker="true"
        />
      </n-space>
    </n-space>
  </n-card>
</template>
<script lang="ts" setup>
  import { deleteRecordApi } from '@/api';
  import { getProductsApi } from '@/api/products/product';
  import { useRouter } from 'vue-router';
  import { userPagination } from '@/hooks/userPagination';
  import { ref, onMounted, h } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';
  import type { Component } from 'vue';
  import { NIcon, NPagination } from 'naive-ui';
  import { MoreOutlined, EditOutlined, DeleteOutlined } from '@vicons/antd';
  import { FileImport } from '@vicons/tabler';
  import { Search20Regular } from '@vicons/fluent';
  import { useGlobSetting } from '@/hooks/setting';

  const globSetting = useGlobSetting();
  const { imgUrl } = globSetting;
  const router = useRouter();
  const dialog = useDialog();
  const selectedOption: any = ref(null);
  const selectedId = ref();
  const message = useMessage();
  const { getList, list, page, pageSizes, itemCount, pageSize, params }: any =
    userPagination(getProductsApi);

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
    },
    {
      label: 'Delete',
      key: 'delete',
      icon: renderIcon(DeleteOutlined),
    },
  ]);

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
    const Loading = window['$loading'] || null;
    Loading.start();
    deleteRecordApi(`/products/${selectedId.value}`)
      .then((result: any) => {
        message.success(result.message);
        getList();
        Loading.finish();
        dialog.destroyAll;
      })
      .catch((result) => {
        message.error(result.message);
        Loading.finish();
        dialog.destroyAll;
      });
    selectedId.value = null;
    selectedOption.value = null;
  }
  const actionOperation = (item: any) => {
    if (selectedOption.value === 'edit') {
      router.push({ name: 'product_update', params: { id: item.id } });
    } else if (selectedOption.value === 'delete') {
      selectedId.value = item.id;
      confirmationDialog();
    }
  };
  const selectedAction = (key: any) => {
    selectedOption.value = key;
  };
  const fetchList = () => {
    getList(params.value);
  };
  onMounted(() => {
    getList();
  });
</script>
<style lang="less" scoped>
  td {
    white-space: nowrap;
  }
  .data_placeholder {
    text-align: center;
    color: gray;
    padding: 20px 0;
    font-size: 18px;
    font-style: italic;
  }
</style>
