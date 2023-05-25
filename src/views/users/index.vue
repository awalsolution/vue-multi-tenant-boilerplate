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
      <div class="table-wrap">
        <n-table :bordered="true" :single-line="false" size="small" :striped="true">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>User Type</th>
              <th>Permissions</th>
              <th>Phone#</th>
              <th>Shop</th>
              <th>Shop Phone#</th>
              <!-- <th>Status</th> -->
              <th>Address</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.id">
              <td>{{ item?.id }}</td>
              <td>{{ item?.profile?.first_name + ' ' + item?.profile?.last_name }}</td>
              <td>{{ item?.email }}</td>
              <td>
                <n-space>
                  <n-tag v-for="role in item.roles" :key="role.id" type="success">
                    {{ role?.name }}
                  </n-tag>
                </n-space>
              </td>
              <td>
                <n-tag v-if="item.user_type" type="success"> {{ item.user_type }} </n-tag>
              </td>
              <td>
                <n-space>
                  <n-tag v-for="permission in item.permissions" :key="permission.id" type="success">
                    {{ permission?.name }}
                  </n-tag>
                </n-space>
              </td>
              <td>{{ item?.profile?.phone_number }}</td>
              <td>{{ item?.shop?.shop_name }}</td>
              <td>{{ item?.shop?.shop_phone }}</td>
              <!-- <td>
                <n-switch
                  v-model:value="item.status"
                  @update:value="updateUserStatus(item.id, item)"
                />
              </td> -->
              <td>{{
                item?.profile?.address +
                ' ' +
                item?.profile?.city +
                ' ' +
                item?.profile?.state +
                ' ' +
                item?.profile?.country
              }}</td>
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
      >
        <template #icon>
          <n-icon>
            <plus-outlined />
          </n-icon>
        </template>
      </n-button>
      <n-modal style="width: 70%" v-model:show="showModal" preset="dialog">
        <template #header>
          <div>Create New User</div>
        </template>
        <n-space :vertical="true">
          <add-user
            @created="
              getList();
              showModal = false;
            "
          />
        </n-space>
      </n-modal>

      <n-modal style="width: 70%" v-model:show="showEditModal" preset="dialog">
        <template #header>
          <div>Update User</div>
        </template>
        <n-space :vertical="true">
          <edit-user
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
  import { getUsersApi, deleteUserApi, updateUserStatusApi } from '@/api/user/user';
  import { userPagination } from '@/hooks/userPagination';
  import { ref, onMounted, h } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';
  import type { Component } from 'vue';
  import { NIcon, NPagination } from 'naive-ui';
  import { MoreOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@vicons/antd';
  import AddUser from '@/components/users/AddUser.vue';
  import EditUser from '@/components/users/EditUser.vue';

  const dialog = useDialog();
  const selectedOption: any = ref(null);
  const showModal = ref(false);
  const showEditModal = ref(false);
  const selectedId = ref();
  const message = useMessage();
  const { getList, list, page, pageSizes, itemCount, pageSize, params }: any =
    userPagination(getUsersApi);
  console.log('users list ==>', list);
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
    deleteUserApi(selectedId.value)
      .then((result) => {
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
</style>
