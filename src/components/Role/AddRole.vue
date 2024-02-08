<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
    <n-form-item style="padding-top: 24px" label="Name" path="name">
      <n-input v-model:value="formValue.name" placeholder="Enter Name" />
    </n-form-item>
    <n-form-item v-if="isSuperAdminUser()" :span="12" label="company Name" path="company_id">
      <n-select
        :filterable="true"
        :tag="false"
        placeholder="Select company"
        v-model:value="formValue.company_id"
        clearable
        @focus="getCompaniesOnFocus"
        :remote="true"
        :clear-filter-after-select="false"
        label-field="company_name"
        value-field="id"
        :loading="companyLoading"
        :options="companies"
      />
    </n-form-item>
    <n-space justify="end">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button secondary type="info" @click="handleValidateClick"> Create </n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { createRecordApi } from '@src/api/endpoints';
import { formRules } from '@src/rules/role_rules';
import { usefilterCompany } from '@src/filters/company';
import { isSuperAdminUser } from '@src/checks/isSuperAdmin';

const { companies, companyLoading, getCompaniesOnFocus } = usefilterCompany();
const formValue: any = ref({});
const formRef = ref<FormInst | null>(null);
const emits = defineEmits(['created']);

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      createRecordApi('/role', formValue.value).then((res: any) => {
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
