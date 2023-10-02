<template>
  <ContentLayout>
    <template #contentHeader>
      <div>New Purchase Order</div>
    </template>
    <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
      <n-grid x-gap="10">
        <n-form-item-gi :span="12" label="Name" path="merchant_name">
          <n-input v-model:value="formValue.merchant_name" placeholder="Enter Name" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Status" path="status">
          <n-select
            v-model:value="formValue.status"
            size="small"
            :options="[
              { label: 'active', value: 'active' },
              { label: 'disabled', value: 'disabled' }
            ]"
          />
        </n-form-item-gi>
      </n-grid>
      <n-space justify="end">
        <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
          <n-button secondary type="info" @click="handleValidateClick"> update </n-button>
        </n-form-item>
      </n-space>
    </n-form>
  </ContentLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import ContentLayout from '@src/layouts/ContentLayout/index.vue';

const formRef = ref<FormInst | null>(null);
const formValue: any = ref({});

const emits = defineEmits(['updated']);
const props = defineProps({
  id: {
    type: Number
  }
});

// fetch single supplier  using id
getRecordApi(`/merchants/${props.id}`).then((res: any) => {
  formValue.value = res.result;
});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateRecordApi(`/merchants/${formValue.value.id}`, formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('updated', res.result);
      });
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
    }
  });
};

const rules = ref({
  merchant_name: {
    required: true,
    message: 'Please Enter Name',
    trigger: 'blur'
  },
  status: {
    required: true,
    message: 'Please select status',
    trigger: 'blur'
  }
});
</script>

<style lang="scss" scoped></style>
