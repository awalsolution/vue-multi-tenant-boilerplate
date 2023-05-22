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
    </n-grid>
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
  // fetch single user using id
  getUserApi(props.id).then((result) => {
    formValue.value = result;
    formValue.value.permissions = formValue.value.permissions.map((v: any) => v.id);
    formValue.value.roles = formValue.value.roles.map((v: any) => v.id);
  });

  const rules = ref({
    email: {
      required: true,
      message: 'Please Enter email',
      trigger: 'blur',
    },
  });

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        const { email, permissions, roles } = formValue.value;
        updateUserApi(formValue.value.id, { email, permissions, roles }).then((result) => {
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
