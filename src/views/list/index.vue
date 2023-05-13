<template>
  <n-card :bordered="false" class="proCard">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm>

    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <template #tableTitle>
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          new build
        </n-button>
      </template>

      <template #toolbar>
        <n-button type="primary" @click="reloadTable">Refresh data</n-button>
      </template>
    </BasicTable>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="New">
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="name" path="name">
          <n-input placeholder="Please enter a name" v-model:value="formParams.name" />
        </n-form-item>
        <n-form-item label="address" path="address">
          <n-input
            type="textarea"
            placeholder="Please enter the address"
            v-model:value="formParams.address"
          />
        </n-form-item>
        <n-form-item label="date" path="date">
          <n-date-picker
            type="datetime"
            placeholder="Please select a date"
            v-model:value="formParams.date"
          />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">Cancel</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">OK</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  // import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { getTableList } from '@/api/table/list';
  import { columns } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { useRouter } from 'vue-router';
  import { type FormRules } from 'naive-ui';

  const rules: FormRules = {
    name: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Please enter a name',
    },
    address: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Please enter the address',
    },
    date: {
      type: 'number',
      required: true,
      trigger: ['blur', 'change'],
      message: 'Please select a date',
    },
  };

  const schemas: FormSchema[] = [
    {
      field: 'name',
      labelMessage: 'This is a hint',
      component: 'NInput',
      label: 'Name',
      componentProps: {
        placeholder: 'Please enter your name',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: 'Please enter your name', trigger: ['blur'] }],
    },
    {
      field: 'mobile',
      component: 'NInputNumber',
      label: 'mobile phone',
      componentProps: {
        placeholder: 'Please enter your mobile number',
        showButton: false,
        onInput: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'type',
      component: 'NSelect',
      label: 'Type',
      componentProps: {
        placeholder: 'Please select a type',
        options: [
          {
            label: 'Comfort',
            value: 1,
          },
          {
            label: 'Economy',
            value: 2,
          },
        ],
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeDate',
      component: 'NDatePicker',
      label: 'Appointment time',
      defaultValue: 1183135260000,
      componentProps: {
        type: 'date',
        clearable: true,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeTime',
      component: 'NTimePicker',
      label: 'stay time',
      componentProps: {
        clearable: true,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'status',
      label: 'Status',
      // slot
      slot: 'statusSlot',
    },
    {
      field: 'makeProject',
      component: 'NCheckbox',
      label: 'reservation item',
      componentProps: {
        placeholder: 'Please select a reservation item',
        options: [
          {
            label: 'Implant teeth',
            value: 1,
          },
          {
            label: 'tooth filling',
            value: 2,
          },
          {
            label: 'root canal',
            value: 3,
          },
        ],
        onUpdateChecked: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeSource',
      component: 'NRadioGroup',
      label: 'Source',
      componentProps: {
        options: [
          {
            label: 'online',
            value: 1,
          },
          {
            label: 'Store',
            value: 2,
          },
        ],
        onUpdateChecked: (e: any) => {
          console.log(e);
        },
      },
    },
  ];

  const router = useRouter();
  const formRef: any = ref(null);
  // const message = useMessage();
  const actionRef = ref();

  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const formParams = reactive({
    name: '',
    address: '',
    date: null,
  });

  const params = ref({
    pageSize: 5,
    name: 'xiaoMa',
  });

  const actionColumn = reactive({
    width: 220,
    title: 'Operation',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: 'Delete',
            onClick: handleDelete.bind(null, record),
            // According to the business control whether to display isShow and auth are and related
            ifShow: () => {
              return true;
            },
            // Whether to display according to the authority control: if there is authority, it will be displayed, and multiple
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
        ],
        dropDownActions: [
          {
            label: 'enable',
            key: 'enabled',
            // Whether to display according to the business control: the enable button is not displayed in the non-enable state
            ifShow: () => {
              return true;
            },
          },
          {
            label: 'disabled',
            key: 'disabled',
            ifShow: () => {
              return true;
            },
          },
        ],
        select: (key) => {
          window['$message'].info(`You clicked the ${key} button`);
        },
      });
    },
  });

  const [register, {}] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  function addTable() {
    showModal.value = true;
  }

  const loadDataTable = async (res) => {
    return await getTableList({ ...formParams, ...params.value, ...res });
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function confirmForm(e) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value.validate((errors) => {
      if (!errors) {
        window['$message'].success('Create successfully');
        setTimeout(() => {
          showModal.value = false;
          reloadTable();
        });
      } else {
        window['$message'].error('Please fill in the complete information');
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
    window['$message'].info('Clicked to delete');
  }

  function handleSubmit(values: Recordable) {
    console.log(values);
    reloadTable();
  }

  function handleReset(values: Recordable) {
    console.log(values);
  }
</script>

<style lang="less" scoped></style>
