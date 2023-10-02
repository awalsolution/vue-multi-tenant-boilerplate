<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-space vertical>
      <n-card
        title="Supplier Details"
        :theme-overrides="cardStyle"
        size="small"
        :header-style="headerStyle"
        :content-style="contentStyle"
      >
        <n-row gutter="10">
          <n-col :span="6">
            <n-form-item label="Supplier Name" path="supplier_name">
              <n-input v-model="formValue.supplier_name" size="small" placeholder="Supplier Name" />
            </n-form-item>
          </n-col>
          <n-col :span="6">
            <n-form-item label="Supplier Company" path="supplier_company">
              <n-input
                v-model:value="formValue.supplier_company"
                size="small"
                placeholder="Supplier Company"
              />
            </n-form-item>
          </n-col>
          <n-col :span="6">
            <n-form-item label="Supplier Phone" path="supplier_phone">
              <n-input
                v-model:value="formValue.supplier_phone"
                size="small"
                placeholder="Supplier Phone"
              />
            </n-form-item>
          </n-col>
          <n-col :span="6">
            <n-form-item label="Supplier Email" path="supplier_email">
              <n-input
                v-model:value="formValue.supplier_email"
                size="small"
                placeholder="Supplier Email"
              />
            </n-form-item>
          </n-col>
          <n-col :span="6">
            <n-form-item label="Supplier Country" path="supplier_country">
              <n-input
                v-model:value="formValue.supplier_country"
                size="small"
                placeholder="Supplier country"
              />
            </n-form-item>
          </n-col>
          <n-col :span="6">
            <n-form-item label="Supplier State" path="supplier_state">
              <n-input
                v-model:value="formValue.supplier_state"
                size="small"
                placeholder="Supplier State"
              />
            </n-form-item>
          </n-col>
          <n-col :span="6">
            <n-form-item label="Supplier City" path="supplier_city">
              <n-input
                v-model:value="formValue.supplier_city"
                size="small"
                placeholder="Supplier City"
              />
            </n-form-item>
          </n-col>
          <n-col :span="6">
            <n-form-item label="Supplier Category" path="supplier_category">
              <n-input
                v-model:value="formValue.supplier_category"
                size="small"
                placeholder="Supplier Category"
              />
            </n-form-item>
          </n-col>
          <n-col :span="24">
            <n-form-item label="Supplier Address" path="supplier_address">
              <n-input
                v-model:value="formValue.supplier_address"
                size="small"
                placeholder="Supplier Address"
                type="textarea"
                :autosize="{
                  minRows: 3,
                  maxRows: 5
                }"
              />
            </n-form-item>
          </n-col>
        </n-row>
      </n-card>
      <n-card
        title="Email Details"
        :theme-overrides="cardStyle"
        size="small"
        :header-style="headerStyle"
        :content-style="contentStyle"
      >
        <n-row gutter="10">
          <n-col :span="4">
            <n-form-item label="Ordered" path="order_email">
              <n-switch v-model:value="formValue.order_email" />
            </n-form-item>
          </n-col>
          <n-col :span="4">
            <n-form-item label="Received" path="order_received">
              <n-switch v-model:value="formValue.order_email" />
            </n-form-item>
          </n-col>
          <n-col :span="4">
            <n-form-item label="Quantity Check" path="order_quantity_check">
              <n-switch v-model:value="formValue.order_email" />
            </n-form-item>
          </n-col>
          <n-col :span="4">
            <n-form-item label="Quality Check" path="order_quality_check">
              <n-switch v-model:value="formValue.order_email" />
            </n-form-item>
          </n-col>
          <n-col :span="4">
            <n-form-item label="Put Away" path="order_putaway">
              <n-switch v-model:value="formValue.order_email" />
            </n-form-item>
          </n-col>
        </n-row>
        <n-row gutter="10">
          <n-col :span="12">
            <n-form-item label="To" path="order_send_email_to">
              <n-input
                v-model:value="formValue.order_send_email_to"
                size="small"
                placeholder="To"
              />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="To" path="order_send_email_cc">
              <n-input
                v-model:value="formValue.order_send_email_cc"
                size="small"
                placeholder="CC"
              />
            </n-form-item>
          </n-col>
        </n-row>
      </n-card>
    </n-space>
    <n-space justify="start" class="pt-3">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button strong secondary type="success" size="medium" @click="handleUpdateClick">
          update
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
import { rules } from '@src/rules/supplier_rules';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';

const formRef = ref<FormInst | null>(null);
const formValue: any = ref({});

const emits = defineEmits(['updated']);
const props = defineProps({
  id: {
    type: Number
  }
});

// fetch single supplier  using id
getRecordApi(`/supplier/${props.id}`).then((res: any) => {
  formValue.value = res.result;
});

const handleUpdateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateRecordApi(`/supplier/${formValue.value.id}`, formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('updated', res.result);
      });
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
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
</script>

<style lang="scss" scoped></style>
