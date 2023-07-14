<template>
  <n-card title="Shops" v-permission="{ action: ['can view shops'] }">
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
            <th>Logo</th>
            <th>Name</th>
            <th>Phone#</th>
            <th>Status</th>
            <th>Address</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th
              v-permission="{
                action: ['can view permissions update', 'can view permissions delete'],
              }"
              >Actions</th
            >
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item?.id }}</td>
            <td>
              <n-avatar round size="large" :src="`${imgUrl}${item?.shop_logo}`" />
            </td>
            <td>{{ item?.shop_name }}</td>
            <td>{{ item?.shop_phone }}</td>
            <td>
              <n-space>
                <n-switch />
              </n-space>
            </td>
            <td>
              {{ item?.address + ' ' + item?.city + ' ' + item?.state + ' ' + item?.country }}
            </td>
            <td>{{ item.created_at }}</td>
            <td>{{ item.updated_at }}</td>
            <td
              v-permission="{
                action: ['can view permissions update', 'can view permissions delete'],
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
        v-permission="{ action: ['can view shop create'] }"
      >
        <template #icon>
          <n-icon>
            <plus-outlined />
          </n-icon>
        </template>
      </n-button>
      <n-modal style="width: 60%" v-model:show="showModal" preset="dialog">
        <template #header>
          <div>Create New Shop</div>
        </template>
        <n-space :vertical="true">
          <add-shop
            @created="
              getList();
              showModal = false;
            "
          />
        </n-space>
      </n-modal>

      <n-modal style="width: 60%" v-model:show="showEditModal" preset="dialog">
        <template #header>
          <div>Update Shop</div>
        </template>
        <n-space :vertical="true">
          <edit-shop
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
  import { deleteRecordApi } from '@/api';
  import { getShopsApi } from '@/api/shop/shop';
  import { userPagination } from '@/hooks/userPagination';
  import { usePermission } from '@/hooks/web/usePermission';
  import { ref, onMounted, h, computed } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';
  import type { Component } from 'vue';
  import { NIcon, NPagination } from 'naive-ui';
  import { MoreOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@vicons/antd';
  import AddShop from '@/components/shop/AddShop.vue';
  import EditShop from '@/components/shop/EditShop.vue';
  import { useGlobSetting } from '@/hooks/setting';

  const globSetting = useGlobSetting();
  const { imgUrl } = globSetting;
  const dialog = useDialog();
  const selectedOption: any = ref(null);
  const showModal = ref(false);
  const showEditModal = ref(false);
  const selectedId = ref();
  const { hasPermission } = usePermission();
  const message = useMessage();
  const { getList, list, page, pageSizes, itemCount, pageSize, params }: any =
    userPagination(getShopsApi);

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
      permission: hasPermission(['can view shop update']),
    },
    {
      label: 'Delete',
      key: 'delete',
      icon: renderIcon(DeleteOutlined),
      permission: hasPermission(['can view shop delete']),
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
    const Loading = window['$loading'] || null;
    Loading.start();
    deleteRecordApi(`/shops/${selectedId.value}`)
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
