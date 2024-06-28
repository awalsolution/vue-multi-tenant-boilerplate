<template>
  <div>
    <n-card title="Edit Tenant">
      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
        <n-row :gutter="[20, 8]">
          <n-col :span="8">
            <n-form-item label="Plan Price" path="plan_id">
              <n-select
                :filterable="true"
                :tag="false"
                placeholder="Select Plan"
                v-model:value="formValue.plan_id"
                clearable
                @focus="getPlansOnFocus"
                :remote="true"
                :clear-filter-after-select="false"
                label-field="name"
                value-field="id"
                :loading="planLoading"
                :options="plans"
              />
            </n-form-item>
          </n-col>
          <n-col :span="8">
            <n-form-item label="Domain Name" path="domain_name">
              <n-input v-model:value="formValue.domain_name" placeholder="Enter Domain Name" />
            </n-form-item>
          </n-col>
          <n-col :span="8">
            <n-form-item label="status" path="status">
              <n-switch v-model:value="formValue.status" :checked-value="1" :unchecked-value="0" />
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
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type FormInst } from 'naive-ui';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import { formRules } from '@src/rules/tenant';
import { usePlanfilter } from '@src/filters/plan';

const route = useRoute();
const router = useRouter();
const formRef = ref<FormInst | null>(null);
const formValue: any = ref({});
const { plans, planLoading, getPlansOnFocus, getPlans } = usePlanfilter();

// fetch single tenant  using id
getRecordApi(`/tenant/single/${route.params.id}`).then((res: any) => {
  formValue.value = res.data;
  getPlans();
});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateRecordApi(`/tenant/${formValue.value.id}`, formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        router.push({
          name: 'tenant_list'
        });
      });
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
    }
  });
};
</script>

<style lang="scss" scoped></style>
