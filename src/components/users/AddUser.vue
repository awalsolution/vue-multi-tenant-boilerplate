<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-form-item style="padding-top: 24px" label="First Name" path="first_name">
      <n-input v-model:value="formValue.first_name" placeholder="Enter First Name" />
    </n-form-item>
    <n-form-item style="padding-top: 4px" label="Last Name" path="last_name">
      <n-input v-model:value="formValue.last_name" placeholder="Enter Last Name" />
    </n-form-item>
    <n-form-item style="padding-top: 4px" label="Email" path="email">
      <n-input v-model:value="formValue.email" placeholder="Enter Email" />
    </n-form-item>
    <n-form-item style="padding-top: 4px" label="Password" path="password">
      <n-input v-model:value="formValue.password" placeholder="Enter Password" />
    </n-form-item>
    <n-form-item style="padding-top: 4px" label="Confirm Password" path="confirmPassword">
      <n-input v-model:value="formValue.confirmPassword" placeholder="Enter confirm password" />
    </n-form-item>
    <n-form-item style="padding-top: 4px" label="User Type" path="user_type">
      <n-select v-model:value="formValue.user_type" size="medium" :options="options" />
    </n-form-item>
    <n-space :vertical="true" style="align-items: center">
      <n-form-item>
        <n-button style="alignment: center" @click="handleValidateClick"> Create</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { createUserApi } from '@/api/user/user';
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
    confirmPassword: {
      required: true,
      message: 'Please Enter confirm password',
      trigger: 'blur',
    },
  });

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        const { first_name, last_name, email, password, confirmPassword, user_type } =
          formValue.value;
        createUserApi({ first_name, last_name, email, password, confirmPassword, user_type }).then(
          (result: any) => {
            window['$message'].success(result.message);
            emits('created', result.result);
          }
        );
      } else {
        console.log(errors);
        window['$message'].error('Please fill out required fields');
      }
    });
  };
</script>

<style lang="less" scoped></style>
