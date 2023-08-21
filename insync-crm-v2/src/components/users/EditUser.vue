<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-grid :span="24" :x-gap="24">
      <n-form-item-gi :span="12" label="Email" path="email">
        <n-input v-model:value="formValue.email" placeholder="Enter Email" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Roles" path="roles">
        <role-selector
          v-model:value="formValue.roles"
          label-field="name"
          value-field="id"
          :tag="true"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Permissions" path="permissions">
        <permission-selector
          v-model:value="formValue.permissions"
          label-field="name"
          value-field="id"
          :tag="true"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Status" path="status">
        <n-select v-model:value="formValue.status" size="small" :options="status" />
      </n-form-item-gi>
    </n-grid>
    <n-space justify="end">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button type="success" @click="handleValidateClick"> Update</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst, useMessage } from 'naive-ui';
  import { getRecordApi, updateRecordApi } from '@src/api/endpoints';

  const formRef = ref<FormInst | null>(null);
  const formValue: any = ref({});
  const message: any = useMessage();

  const emits = defineEmits(['updated']);
  const props = defineProps({
    id: {
      type: Number,
    },
  });
  // fetch single user using id
  getRecordApi(`/users/${props.id}`).then((result) => {
    formValue.value = result.result;
    formValue.value.permissions = formValue.value.permissions.map((v: any) => v.id);
    formValue.value.roles = formValue.value.roles.map((v: any) => v.id);
  });

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        console.log(formValue.value);
        updateRecordApi(`/users/${formValue.value.id}`, formValue.value).then((result) => {
          message.success(result.message);
          emits('updated', result);
        });
      } else {
        console.log(errors);
        message.error('Invalid');
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
