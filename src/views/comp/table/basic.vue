<template>
  <n-card :bordered="false" class="proCard">
    <BasicTable
      title="table list"
      titleTooltip="This is a tip"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      :scroll-x="1360"
      @update:checked-row-keys="onCheckedRow"
    >
      <template #toolbar>
        <n-button type="primary" @click="reloadTable">Refresh data</n-button>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
  import { reactive, ref, h } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { getTableList } from '@/api/table/list';
  import { columns } from './basicColumns';
  import { useDialog, useMessage } from 'naive-ui';
  import { DeleteOutlined, EditOutlined } from '@vicons/antd';

  const message = useMessage();
  const dialog = useDialog();
  const actionRef = ref();

  const params = reactive({
    pageSize: 5,
    name: 'xiaoMa',
  });

  const actionColumn = reactive({
    width: 150,
    title: 'Operation',
    key: 'action',
    fixed: 'right',
    align: 'center',
    render(record) {
      return h(TableAction as any, {
        style: 'text',
        actions: createActions(record),
      });
    },
  });

  function createActions(record) {
    return [
      {
        label: 'Delete',
        type: 'error',
        // Configuring color will override type
        color: 'red',
        icon: DeleteOutlined,
        onClick: handleDelete.bind(null, record),
        // According to the business control whether to display isShow and auth are and related
        ifShow: () => {
          return true;
        },
        // Whether to display according to the authority control: if there is authority, it will be displayed, and multiple
        auth: ['basic_list'],
      },
      {
        label: '编辑',
        type: 'primary',
        icon: EditOutlined,
        onClick: handleEdit.bind(null, record),
        ifShow: () => {
          return true;
        },
        auth: ['basic_list'],
      },
    ];
  }

  const loadDataTable = async (res) => {
    return await getTableList({ ...params, ...res });
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function handleDelete(record) {
    console.log(record);
    dialog.info({
      title: 'Prompt',
      content: `Do you want to delete ${record.name}`,
      positiveText: 'OK',
      negativeText: 'Cancel',
      onPositiveClick: () => {
        message.success('delete successfully');
      },
      onNegativeClick: () => {},
    });
  }

  function handleEdit(record) {
    console.log(record);
    message.success('You clicked the edit button');
  }
</script>

<style lang="less" scoped></style>
