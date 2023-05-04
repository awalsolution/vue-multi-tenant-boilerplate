<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Role Permission Management">
        Page data is Mock sample data, not real data.
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <BasicTable
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row:any) => row.id"
        ref="actionRef"
        :actionColumn="actionColumn"
        @update:checked-row-keys="onCheckedRow"
      >
        <template #tableTitle>
          <n-button type="primary">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            Add Role
          </n-button>
        </template>

        <template #action>
          <TableAction />
        </template>
      </BasicTable>
    </n-card>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" :title="editRoleTitle">
      <div class="py-3 menu-list">
        <n-tree
          block-line
          cascade
          checkable
          :virtual-scroll="true"
          :data="treeData"
          :expandedKeys="expandedKeys"
          :checked-keys="checkedKeys"
          style="max-height: 950px; overflow: hidden"
          @update:checked-keys="checkedTree"
          @update:expanded-keys="onExpandedKeys"
        />
      </div>
      <template #action>
        <n-space>
          <n-button type="info" ghost icon-placement="left" @click="packHandle">
            All {{ expandedKeys.length ? 'Collapse' : 'Expand' }}
          </n-button>

          <n-button type="info" ghost icon-placement="left" @click="checkedAllHandle">
            All {{ checkedAll ? 'Cancel' : 'Select' }}
          </n-button>
          <n-button type="primary" :loading="formBtnLoading" @click="confirmForm">Submit</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, unref, h, onMounted } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { getRoleList } from '@/api/auth/role';
  import { getMenuList } from '@/api/auth/menu';
  import { columns } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { getTreeAll } from '@/utils';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const formRef: any = ref(null);
  const message = useMessage();
  const actionRef = ref();

  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const checkedAll = ref(false);
  const editRoleTitle = ref('');
  const treeData = ref([]);
  const expandedKeys = ref([]);
  const checkedKeys = ref(['console', 'step-form']);

  const params = reactive({
    pageSize: 5,
    name: 'xiaoMa',
  });

  const actionColumn = reactive({
    width: 250,
    title: 'Operation',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction, {
        style: 'button',
        actions: [
          {
            label: 'menu permissions',
            onClick: handleMenuAuth.bind(null, record),
            // According to the business control whether to display isShow and auth are and related
            ifShow: () => {
              return true;
            },
            // Whether to display according to the permission control: if there is permission, it will be displayed, and multiple
            auth: ['basic_list'],
          },
          {
            label: 'edit',
            onClick: handleEdit.bind(null, record),
            ifShow: () => {
              return true;
            },
            auth: ['basic_list'],
          },
          {
            label: 'Delete',
            onClick: handleDelete.bind(null, record),
            // According to the business control whether to display isShow and auth are and related
            ifShow: () => {
              return true;
            },
            // Whether to display according to the permission control: if there is permission, it will be displayed, and multiple
            auth: ['basic_list'],
          },
        ],
      });
    },
  });

  const loadDataTable = async (res: any) => {
    let _params = {
      ...unref(params),
      ...res,
    };
    return await getRoleList(_params);
  };

  function onCheckedRow(rowKeys: any[]) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function confirmForm(e: any) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value.validate((errors) => {
      if (!errors) {
        message.success('Create successfully');
        setTimeout(() => {
          showModal.value = false;
          reloadTable();
        });
      } else {
        message.error('Please fill in the complete information');
      }
      formBtnLoading.value = false;
    });
  }

  function handleEdit(record: Recordable) {
    console.log('Clicked to edit', record);
    router.push({ name: 'basic-info', params: { id: record.id } });
  }

  function handleDelete(record: Recordable) {
    console.log('Clicked to delete', record);
    message.info('Clicked to delete');
  }

  function handleMenuAuth(record: Recordable) {
    editRoleTitle.value = `Assign menu permissions for ${record.name}`;
    checkedKeys.value = record.menu_keys;
    showModal.value = true;
  }

  function checkedTree(keys: any) {
    checkedKeys.value = [checkedKeys.value, ...keys];
  }

  function onExpandedKeys(keys: any) {
    expandedKeys.value = keys;
  }

  function packHandle() {
    if (expandedKeys.value.length) {
      expandedKeys.value = [];
    } else {
      expandedKeys.value = treeData.value.map((item: any) => item.key) as [];
    }
  }

  function checkedAllHandle() {
    if (!checkedAll.value) {
      checkedKeys.value = getTreeAll(treeData.value);
      checkedAll.value = true;
    } else {
      checkedKeys.value = [];
      checkedAll.value = false;
    }
  }

  onMounted(async () => {
    const treeMenuList = await getMenuList();
    expandedKeys.value = treeMenuList.list.map((item: any) => item.key);
    treeData.value = treeMenuList.list;
  });
</script>

<style lang="less" scoped></style>
