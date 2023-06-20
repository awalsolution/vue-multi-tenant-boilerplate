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
        <n-select v-model:value="formValue.user_type" size="medium" :options="options" />
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
  import { FormInst } from 'naive-ui';
  import { createRecordApi } from '@/api';
  const options = ref([
    {
      label: 'Vendor',
      value: 'vendor',
    },
    {
      label: 'User',
      value: 'user',
    },
  ]);
  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const emits = defineEmits(['created']);
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

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        createRecordApi('/customers', formValue.value).then((result: any) => {
          window['$message'].success(result.message);
          emits('created', result.result);
        });
      } else {
        console.log(errors);
        window['$message'].error('Please fill out required fields');
      }
    });
  };
</script>

<style lang="less" scoped></style>
