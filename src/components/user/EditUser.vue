<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
    <n-grid :span="24" :x-gap="24">
      <n-form-item-gi :span="12" label="Email" path="email">
        <n-input v-model:value="formValue.email" placeholder="Enter Email" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Status" path="status">
        <n-switch v-model:value="formValue.status" :checked-value="1" :unchecked-value="0" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="User Role" path="roles">
        <n-select
          :filterable="true"
          multiple
          :tag="false"
          placeholder="Select Role"
          v-model:value="formValue.roles"
          clearable
          @focus="getRolesOnFocus"
          :remote="true"
          :clear-filter-after-select="false"
          label-field="name"
          value-field="id"
          :loading="roleLoading"
          :options="roles"
        />
      </n-form-item-gi>
    </n-grid>
    <n-space justify="end">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button secondary type="info" @click="handleValidateClick"> Update </n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import { useRolefilter } from '@src/filters/role';
import { formRules } from '@src/rules/user_rules';

const { roles, roleLoading, getRoles, getRolesOnFocus } = useRolefilter();
const formRef = ref<FormInst | null>(null);
const formValue: any = ref({});

const emits = defineEmits(['updated']);
const props = defineProps({
  id: {
    type: Number
  }
});
// fetch single user using id
getRecordApi(`/user/${props.id}`).then((res: any) => {
  formValue.value = res.data;
  formValue.value.roles = formValue.value.roles.map((v: any) => v.id);
  getRoles();
});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(formValue.value);
      updateRecordApi(`/user/${formValue.value.id}`, formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('updated', res.data);
      });
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
    }
  });
};
</script>

<style lang="scss" scoped></style>
