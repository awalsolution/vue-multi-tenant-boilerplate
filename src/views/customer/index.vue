<template>
  <n-card title="Customers" v-permission="{ action: ['can view customers'] }">
    <n-space :vertical="true">
      <n-input
        type="text"
        size="small"
        v-model:value="params.name"
        @change="fetchList"
        placeholder="Search by Name"
      />
      <div class="table-wrap">
        <n-table :bordered="true" :single-line="false" size="small" :striped="true">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Shop Name</th>
              <th>Shop Phone</th>
              <th>Billing Address</th>
              <th>Shipping Address</th>
              <th>Created At</th>
              <th
                v-permission="{
                  action: ['can view customer update', 'can view customer delete'],
                }"
                >Actions</th
              >
            </tr>
          </thead>
          <tbody>
            <tr v-if="list.length === 0">
              <td colspan="4" class="data_placeholder"> Record Not Exist </td>
            </tr>
            <tr v-else v-for="item in list" :key="item.id">
              <td>{{ item?.id }}</td>
              <td>{{ item?.first_name + ' ' + item?.last_name }}</td>
              <td>{{ item?.email }}</td>
              <td>{{ item.phone_number }}</td>
              <td>{{ item?.shop?.shop_name }}</td>
              <td>{{ item?.shop?.shop_phone }}</td>
              <td>
                <n-space>
                  {{
                    item?.billing_address.street +
                    ' ' +
                    item?.billing_address?.city +
                    ' ' +
                    item?.billing_address?.state +
                    ' ' +
                    item?.billing_address?.country
                  }}
                </n-space>
              </td>
              <td>
                <n-space>
                  {{
                    item?.shipping_address.street +
                    ' ' +
                    item?.shipping_address?.city +
                    ' ' +
                    item?.shipping_address?.state +
                    ' ' +
                    item?.shipping_address?.country
                  }}
                </n-space>
              </td>
              <td>{{ item.created_at }}</td>
              <td
                v-permission="{
                  action: ['can view customer update', 'can view customer delete'],
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
        v-permission="{ action: ['can view customer create'] }"
      >
        <template #icon>
          <n-icon>
            <plus-outlined />
          </n-icon>
        </template>
      </n-button>
      <n-modal style="width: 50%" v-model:show="showModal" preset="dialog">
        <template #header>
          <div>Create New Customer</div>
        </template>
        <n-space :vertical="true">
          <add-customer
            @created="
              getList();
              showModal = false;
            "
          />
        </n-space>
      </n-modal>

      <n-modal style="width: 50%" v-model:show="showEditModal" preset="dialog">
        <template #header>
          <div>Update Customer</div>
        </template>
        <n-space :vertical="true">
          <edit-customer
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
  import { getCustomersApi } from '@/api/customer/customer';
  import { userPagination } from '@/hooks/userPagination';
  import { usePermission } from '@/hooks/web/usePermission';
  import { ref, onMounted, h, computed } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';
  import type { Component } from 'vue';
  import { NIcon, NPagination } from 'naive-ui';
  import { MoreOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@vicons/antd';
  import AddCustomer from '@/components/customer/AddCustomer.vue';
  import EditCustomer from '@/components/customer/EditCustomer.vue';

  const dialog = useDialog();
  const selectedOption: any = ref(null);
  const showModal = ref(false);
  const showEditModal = ref(false);
  const selectedId = ref();
  const { hasPermission } = usePermission();
  const message = useMessage();
  const { getList, list, page, pageSizes, itemCount, pageSize, params }: any =
    userPagination(getCustomersApi);
  console.log('customer list ==>', list);
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
      permission: hasPermission(['can view user update']),
    },
    {
      label: 'Delete',
      key: 'delete',
      icon: renderIcon(DeleteOutlined),
      permission: hasPermission(['can view user delete']),
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
    deleteRecordApi(`/customers/${selectedId.value}`)
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

  // function updateUserStatus(id: any, item: any) {
  //   const Loading = window['$loading'] || null;
  //   Loading.start();
  //   updateUserStatusApi(id, { status: item.status })
  //     .then((result) => {
  //       message.success(result.message);
  //       getList();
  //       Loading.finish();
  //       dialog.destroyAll;
  //     })
  //     .catch((result) => {
  //       message.error(result.message);
  //       Loading.finish();
  //       dialog.destroyAll;
  //     });
  // }

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
<style lang="less" scoped>
  .item_center {
    text-align: center;
  }
  .table-wrap {
    overflow-x: scroll;
  }
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
