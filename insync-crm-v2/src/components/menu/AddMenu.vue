<template>
  <n-form ref="menuFormRef" :label-width="80" :model="menusData" :rules="rules" size="small">
    <n-grid x-gap="10">
      <n-form-item-gi :span="8" label="Route Name" path="route_name">
        <n-input v-model:value="menusData.route_name" placeholder="Enter Route Name" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="Menu URL" path="menu_url">
        <n-input v-model:value="menusData.menu_url" placeholder="Enter Menu URL" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="Menu Name" path="menu_name">
        <n-input v-model:value="menusData.menu_name" placeholder="Enter Menu Name" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="Menu Order" path="menu_order">
        <n-input-number
          v-model:value="menusData.menu_order"
          placeholder="Enter Menu Order"
          clearable
          class="w-full"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="Menu Icon Name" path="menu_icon">
        <n-input v-model:value="menusData.menu_icon" placeholder="Enter Menu Icon Name" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="Status" path="status">
        <n-select v-model:value="menusData.status" :options="status" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="Is Parent" path="is_parent">
        <n-checkbox v-model:checked="menusData.is_parent" />
      </n-form-item-gi>
      <n-form-item-gi v-if="menusData.is_parent" :span="8" label="Parent Menu" path="parent_id">
        <n-select
          :filterable="true"
          :tag="false"
          placeholder="Select Parent Menu"
          v-model:value="menusData.parent_id"
          clearable
          @focus="getMenusOnFocus"
          @search="findMenu"
          :remote="true"
          :clear-filter-after-select="false"
          label-field="menu_name"
          value-field="id"
          :loading="menuLoading"
          :options="menus"
        />
      </n-form-item-gi>
    </n-grid>
    <n-space justify="end">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button type="success" @click="handleValidateClick"> Create</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst, useMessage } from 'naive-ui';
  import { createRecordApi } from '@src/api/endpoints';
  import { filterMenu } from '@src/filters/menus';

  const { menus, menuLoading, getMenusOnFocus, findMenu } = filterMenu();
  const menuFormRef = ref<FormInst | null>(null);
  const menusData: any = ref({});
  const message: any = useMessage();

  const emits = defineEmits(['created']);

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    menuFormRef.value?.validate((errors) => {
      if (!errors) {
        console.log(menusData.value);
        createRecordApi('/menus', menusData.value).then((res: any) => {
          message.success(res.message);
          emits('created', res.result);
        });
      } else {
        console.log(errors);
        message.error('Please fill out required fields');
      }
    });
  };

  const status = ref([
    {
      label: 'active',
      value: 'active',
    },
    {
      label: 'disabled',
      value: 'disabled',
    },
  ]);

  const rules = ref({
    shop_name: {
      required: true,
      message: 'Please Enter Name',
      trigger: 'blur',
    },
    shop_phone: {
      required: true,
      message: 'Please Enter Phone',
      trigger: 'blur',
    },
    address: {
      required: true,
      message: 'Please Enter Address',
      trigger: 'blur',
    },
    city: {
      required: true,
      message: 'Please Enter City',
      trigger: 'blur',
    },
    state: {
      required: true,
      message: 'Please Enter State',
      trigger: 'blur',
    },
    country: {
      required: true,
      message: 'Please Enter Country',
      trigger: 'blur',
    },
    shop_logo: {
      required: true,
      message: 'Please Upload Logo',
      trigger: 'blur',
    },
  });
</script>

<style lang="css" scoped></style>
