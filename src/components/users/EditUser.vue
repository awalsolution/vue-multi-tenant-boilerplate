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
    <n-form-item style="padding-top: 24px" label="Permissions" path="permissions">
      <permission-selector
        v-model:value="formValue.permissions"
        label-field="name"
        value-field="id"
        :tag="true"
      />
    </n-form-item>
    <n-space :vertical="true" style="align-items: center">
      <n-form-item>
        <n-button style="alignment: center" @click="handleValidateClick"> Save</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { getUserApi, updateUserApi } from '@/api/user/user';
  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const emits = defineEmits(['updated']);
  const props = defineProps({
    id: {
      type: Number,
    },
  });
  // fetch single Role  using id
  getUserApi(props.id).then((result) => {
    formValue.value = result;
    formValue.value.permissions = formValue.value.permissions.map((v: any) => v.id);
  });

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
        const { first_name, last_name, email, password, confirmPassword } = formValue.value;
        updateUserApi(formValue.value.id, {
          first_name,
          last_name,
          email,
          password,
          confirmPassword,
        }).then((result) => {
          window['$message'].success(result.message);
          emits('updated', result);
        });
      } else {
        console.log(errors);
        window['$message'].error('Invalid');
      }
    });
  };
</script>

<style lang="less" scoped></style>
