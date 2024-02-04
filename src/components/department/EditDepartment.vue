<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
    <n-grid :span="24" :x-gap="24">
      <n-form-item-gi :span="24" label="Name" path="name">
        <n-input v-model:value="formValue.name" placeholder="Enter Name" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="Status" path="status">
        <n-switch v-model:value="formValue.status" :checked-value="1" :unchecked-value="0" />
      </n-form-item-gi>
      <n-form-item-gi v-if="isSuperAdminUser()" :span="16" label="company Name" path="company_id">
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
      </n-form-item-gi>
    </n-grid>
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
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import { formRules } from '@src/rules/department_rules';
import { usefilterCompany } from '@src/filters/company';
import { isSuperAdminUser } from '@src/checks/isSuperAdmin';

const { companies, companyLoading, getCompaniesOnFocus, getCompanies } = usefilterCompany();
const formRef = ref<FormInst | null>(null);
const formValue: any = ref({});

const emits = defineEmits(['updated']);
const props = defineProps({
  id: {
    type: Number
  }
});
// fetch single department using id
getRecordApi(`/department/${props.id}`).then((res: any) => {
  formValue.value = res.result;
  getCompanies();
});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(formValue.value);
      updateRecordApi(`/department/${formValue.value.id}`, formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('updated', res.result);
      });
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
    }
  });
};
</script>

<style lang="scss" scoped></style>
