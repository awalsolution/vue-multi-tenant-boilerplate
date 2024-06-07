<template>
  <div>
    <n-card title="Add New Plan">
      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
        <n-row :gutter="[20, 8]">
          <n-col :span="12">
            <n-form-item label="Plan Name" path="name">
              <n-input v-model:value="formValue.name" placeholder="Enter Name" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Plan Price" path="price">
              <n-input v-model:value="formValue.price" placeholder="Enter Price" />
            </n-form-item>
          </n-col>
          <n-col :span="24">
            <n-form-item label="Plan Type" path="type">
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
          </n-col>
          <n-col :span="24">
            <n-form-item label="Plan Description" path="description">
              <n-input
                type="textarea"
                v-model:value="formValue.description"
                placeholder="Enter description"
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
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { type FormInst } from 'naive-ui';
import { createRecordApi } from '@src/api/endpoints';
import { formRules } from '@src/rules/plan';

const router = useRouter();
const formRef = ref<FormInst | null>(null);
const formValue: Ref = ref({});

// const emits = defineEmits(['created']);

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      createRecordApi('/plan', formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        router.push({
          name: 'plan_list'
        });
        // emits('created', res.data);
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
