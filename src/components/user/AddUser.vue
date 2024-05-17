<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
    <n-row :gutter="[20, 8]">
      <n-col :span="24">
        <n-form-item label="First Name" path="first_name">
          <n-input v-model:value="formValue.first_name" placeholder="Enter First Name" />
        </n-form-item>
      </n-col>
      <n-col :span="24">
        <n-form-item :span="12" label="Last Name" path="last_name">
          <n-input v-model:value="formValue.last_name" placeholder="Enter Last Name" />
        </n-form-item>
      </n-col>
      <n-col :span="24">
        <n-form-item label="Email" path="email">
          <n-input v-model:value="formValue.email" placeholder="Enter Email" />
        </n-form-item>
      </n-col>
      <n-col :span="24">
        <n-form-item :span="12" label="Password" path="password">
          <n-input
            v-model:value="formValue.password"
            type="password"
            showPasswordOn="click"
            placeholder="Enter Password"
          />
        </n-form-item>
      </n-col>
      <n-col :span="24">
        <n-form-item label="status" path="status">
          <n-switch v-model:value="formValue.status" :checked-value="1" :unchecked-value="0" />
        </n-form-item>
      </n-col>
      <n-col :span="24">
        <n-form-item :span="12" label="User Role" path="role_id">
          <n-select
            :filterable="true"
            multiple
            :tag="false"
            placeholder="Select Role"
            v-model:value="formValue.role_id"
            clearable
            @focus="getRolesOnFocus"
            :remote="true"
            :clear-filter-after-select="false"
            label-field="name"
            value-field="id"
            :loading="roleLoading"
            :options="roles"
          />
        </n-form-item>
      </n-col>
    </n-row>
    <n-space justify="end">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button secondary type="info" @click="handleValidateClick"> Save </n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { createRecordApi } from '@src/api/endpoints';
import { usefilterRole } from '@src/filters/roles';
import { formRules } from '@src/rules/user';

const { roles, roleLoading, getRolesOnFocus } = usefilterRole();
const formRef = ref<FormInst | null>(null);
const formValue: Ref = ref({});
// const isVendor: any = ref(false);

// const checkVendorRole = () => {
//   const names = formValue.value.role_id
//     .map((val: any) => {
//       const found = roles.value.find((item: any) => item.id === val);
//       return found ? found.name : null;
//     })
//     .filter(Boolean);

//   if (names.includes('vendor')) {
//     isVendor.value = true;
//   } else {
//     isVendor.value = false;
//   }
// };

const emits = defineEmits(['created']);

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      createRecordApi('/user', formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('created', res.data);
      });
    } else {
      console.log(errors);
      window['$message'].error('Please fill out required fields');
    }
  });
};
</script>

<style lang="scss" scoped></style>
