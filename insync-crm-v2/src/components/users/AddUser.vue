<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-grid :span="24" :x-gap="24">
      <n-form-item-gi :span="12" label="First Name" path="first_name">
        <n-input v-model:value="formValue.first_name" placeholder="Enter First Name" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Last Name" path="last_name">
        <n-input v-model:value="formValue.last_name" placeholder="Enter Last Name" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Email" path="email">
        <n-input v-model:value="formValue.email" placeholder="Enter Email" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Password" path="password">
        <n-input
          v-model:value="formValue.password"
          type="password"
          showPasswordOn="click"
          placeholder="Enter Password"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="User Type" path="user_type">
        <n-select v-model:value="formValue.user_type" size="small" :options="userType" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Status" path="status">
        <n-select v-model:value="formValue.status" size="small" :options="status" />
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

  const formRef = ref<FormInst | null>(null);
  const formValue: any = ref({});
  const message: any = useMessage();

  const emits = defineEmits(['created']);

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        createRecordApi('/users', formValue.value).then((res: any) => {
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

  const userType = ref([
    {
      label: 'Vendor',
      value: 'vendor',
    },
    {
      label: 'Admin',
      value: 'admin',
    },
    {
      label: 'User',
      value: 'user',
    },
  ]);

  const rules = ref({
    first_name: {
      required: true,
      message: 'Please Enter First Name',
      trigger: 'blur',
    },
    last_name: {
      required: true,
      message: 'Please Enter last Name',
      trigger: 'blur',
    },
    email: {
      required: true,
      message: 'Please Enter email',
      trigger: 'blur',
    },
    password: {
      required: true,
      message: 'Please Enter Password',
      trigger: 'blur',
    },
  });
</script>

<style lang="less" scoped></style>
