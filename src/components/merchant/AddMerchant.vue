<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-card
      title="Merchant Details"
      :theme-overrides="cardStyle"
      size="small"
      :header-style="headerStyle"
      :content-style="contentStyle"
    >
      <n-row gutter="10">
        <n-col :span="12">
          <n-form-item label="Merchant Name" path="merchant_name">
            <n-input v-model:value="formValue.merchant_name" placeholder="Enter Merchant Name" />
          </n-form-item>
        </n-col>
        <n-col :span="12">
          <n-form-item label="Merchant Status" path="status">
            <n-select
              v-model:value="formValue.status"
              size="small"
              :options="[
                { label: 'active', value: 'active' },
                { label: 'disabled', value: 'disabled' }
              ]"
              placeholder="Search Status"
              clearable
              :remote="true"
              :filterable="true"
              :clear-filter-after-select="false"
            />
          </n-form-item>
        </n-col>
        <n-col :span="24" v-if="isSuperAdminUser()">
          <n-form-item :span="12" label="Shop Name" path="shop_id">
            <n-select
              :filterable="true"
              :tag="false"
              placeholder="Search Shop"
              v-model:value="formValue.shop_id"
              clearable
              @focus="getShopsOnFocus"
              :remote="true"
              :clear-filter-after-select="false"
              label-field="shop_name"
              value-field="id"
              :loading="shopLoading"
              :options="shops"
            />
          </n-form-item>
        </n-col>
      </n-row>
    </n-card>

    <n-space justify="start" class="pt-3">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button strong secondary type="success" size="medium" @click="handleCreateClick">
          Create
        </n-button>
      </n-form-item>
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button strong secondary type="error" size="medium" @click="handleResetClick">
          Reset
        </n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { createRecordApi } from '@src/api/endpoints';
import { isSuperAdminUser } from '@src/checks/isSuperAdmin';
import { usefilterShop } from '@src/filters/shops';

const { shops, shopLoading, getShopsOnFocus } = usefilterShop();
const formValue: any = ref({});
const formRef = ref<FormInst | null>(null);

const emits = defineEmits(['created']);

const handleCreateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      createRecordApi('/merchants', formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('created', res.result);
      });
    } else {
      console.log(errors);
      window['$message'].error('Please fill out required fields');
    }
  });
};

const handleResetClick = (e: MouseEvent) => {
  e.preventDefault();
  window['$message'].success('Successfully click on Reset Button kindly write your logic');
};

// card style
const cardStyle = {
  paddingSmall: '0px',
  borderRadius: '3px'
};
const headerStyle = {
  borderBottom: '1px solid #efeff5',
  padding: '8px 0px 8px 15px'
};
const contentStyle = { padding: '24px 15px 8px 15px' };

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
