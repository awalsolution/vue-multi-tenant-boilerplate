<template>
  <n-card>
    <n-space :vertical="true">
      <n-input
        type="text"
        size="small"
        v-model:value="params.name"
        @change="fetchList"
        placeholder="Search by Name"
      />
      <n-table :bordered="true" :single-line="false" size="small" :striped="true">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>SKU ID</th>
            <th>Price</th>
            <th>Sale Price</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.product_images }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.product_sku }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.sale_price }}</td>
            <td>{{ item.slug }}</td>
            <td>
              <n-space>
                <n-switch />
              </n-space>
            </td>
            <td>{{ item.created_at }}</td>
            <td>
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
      <n-button
        type="primary"
        size="large"
        :circle="true"
        style="position: fixed; bottom: 30px; right: 40px"
        @click="showModal = true"
      >
        <template #icon>
          <n-icon>
            <plus-outlined />
          </n-icon>
        </template>
      </n-button>
      <n-modal style="width: 70%" v-model:show="showModal" preset="dialog">
        <template #header>
          <div>Create New Product</div>
        </template>
        <n-space :vertical="true">
          <add-product
            @created="
              getList();
              showModal = false;
            "
          />
        </n-space>
      </n-modal>

      <n-modal style="width: 70%" v-model:show="showEditModal" preset="dialog">
        <template #header>
          <div>Update Product</div>
        </template>
        <n-space :vertical="true">
          <edit-product
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
  import { getProductsApi, deleteProductApi, updateProductStatusApi } from '@/api/products/product';
  import { userPagination } from '@/hooks/userPagination';
  import { ref, onMounted, h } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';
  import type { Component } from 'vue';
  import { NIcon, NPagination } from 'naive-ui';
  import { MoreOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@vicons/antd';
  import AddProduct from '@/components/products/AddProduct.vue';
  import EditProduct from '@/components/products/EditProduct.vue';

  const dialog = useDialog();
  const selectedOption: any = ref(null);
  const showModal = ref(false);
  const showEditModal = ref(false);
  const selectedId = ref();
  const message = useMessage();
  const { getList, list, page, pageSizes, itemCount, pageSize, params }: any =
    userPagination(getProductsApi);
  console.log('product list =>>', list);
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
    deleteProductApi(selectedId.value)
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
    getList(params.value);
  };
  onMounted(() => {
    getList();
  });
</script>
