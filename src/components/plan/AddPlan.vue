<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
    <n-form-item label="Plan Name" path="name">
      <n-input v-model:value="formValue.name" placeholder="Enter Name" />
    </n-form-item>
    <n-form-item label="Plan Price" path="price">
      <n-input v-model:value="formValue.price" placeholder="Enter Price" />
    </n-form-item>
    <n-form-item :span="12" label="Plan Type" path="type">
      <n-select
        :filterable="true"
        :tag="false"
        placeholder="Select Plan Type"
        v-model:value="formValue.type"
        clearable
        :clear-filter-after-select="false"
        label-field="label"
        value-field="key"
        :options="planType"
      />
    </n-form-item>
    <n-form-item label="Plan Description" path="description">
      <n-input v-model:value="formValue.description" placeholder="Enter description" />
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
import { formRules } from '@src/rules/plan_rules';

const formRef = ref<FormInst | null>(null);
const formValue: any = ref({});

const emits = defineEmits(['created']);

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      createRecordApi('/plan', formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('created', res.data);
      });
    } else {
      console.log(errors);
      window['$message'].error('Please fill out required fields');
    }
  });
};

const planType = [
  { label: 'Month', key: 'month' },
  { label: 'Quater', key: 'quater' },
  { label: 'Year', key: 'year' }
];
</script>

<style lang="scss" scoped></style>
