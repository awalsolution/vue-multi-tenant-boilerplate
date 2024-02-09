<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
    <n-form-item label="Name" path="name">
      <n-input v-model:value="formValue.name" placeholder="Edit Name" />
    </n-form-item>
    <n-form-item :span="12" label="Role Type" path="type">
      <n-select
        :filterable="true"
        :tag="false"
        placeholder="Select Role Type"
        v-model:value="formValue.type"
        clearable
        :clear-filter-after-select="false"
        label-field="label"
        value-field="key"
        :options="roleType"
      />
    </n-form-item>
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
import { formRules } from '@src/rules/role_rules';

const formValue: any = ref({});
const formRef = ref<FormInst | null>(null);

const emits = defineEmits(['updated']);
const props = defineProps({
  id: {
    type: Number
  }
});
// fetch single Role  using id
getRecordApi(`/role/${props.id}`).then((res: any) => {
  formValue.value = res.data;
});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateRecordApi(`/role/${formValue.value.id}`, formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('updated', res.data);
      });
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
    }
  });
};

const roleType = [
  { label: 'Public', key: 'public' },
  { label: 'Private', key: 'private' }
];
</script>

<style lang="scss" scoped></style>
