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
            <n-form-item label="Name" path="supplier_name">
              <n-input v-model="formValue.supplier_name" size="small" placeholder="Enter Name" />
            </n-form-item>
          </n-col>
          <n-col :span="6">
            <n-form-item label="Phone" path="supplier_phone">
              <n-input
                v-model:value="formValue.supplier_phone"
                size="small"
                placeholder="Enter Phone"
              />
            </n-form-item>
          </n-col>
          <n-col :span="6">
            <n-form-item label="Email" path="supplier_email">
              <n-input
                v-model:value="formValue.supplier_email"
                size="small"
                placeholder="Enter Email"
              />
            </n-form-item>
          </n-col>
          <n-col :span="6">
            <n-form-item label="Country" path="supplier_country">
              <n-input
                v-model:value="formValue.supplier_country"
                size="small"
                placeholder="Enter Country"
              />
            </n-form-item>
          </n-col>
          <n-col :span="6">
            <n-form-item label="State" path="supplier_state">
              <n-input
                v-model:value="formValue.supplier_state"
                size="small"
                placeholder="Enter State"
              />
            </n-form-item>
          </n-col>
          <n-col :span="6">
            <n-form-item label="City" path="supplier_city">
              <n-input
                v-model:value="formValue.supplier_city"
                size="small"
                placeholder="Enter City"
              />
            </n-form-item>
          </n-col>
          <n-col :span="24">
            <n-form-item label="Address" path="supplier_address">
              <n-input
                v-model:value="formValue.supplier_address"
                size="small"
                placeholder="Enter Address"
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
            <n-form-item label="Ordered" path="ordered">
              <n-switch v-model:value="formValue.ordered" />
            </n-form-item>
          </n-col>
          <n-col :span="4">
            <n-form-item label="Received" path="received">
              <n-switch v-model:value="formValue.received" />
            </n-form-item>
          </n-col>
          <n-col :span="4">
            <n-form-item label="Quantity Check" path="quantity_check">
              <n-switch v-model:value="formValue.quantity_check" />
            </n-form-item>
          </n-col>
          <n-col :span="4">
            <n-form-item label="Quality Check" path="quality_check">
              <n-switch v-model:value="formValue.quality_check" />
            </n-form-item>
          </n-col>
          <n-col :span="4">
            <n-form-item label="Put Away" path="put_away">
              <n-switch v-model:value="formValue.put_away" />
            </n-form-item>
          </n-col>
        </n-row>
        <n-row gutter="10">
          <n-col :span="12">
            <n-form-item label="To" path="to">
              <n-input v-model:value="formValue.to" size="small" placeholder="To" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="To" path="cc">
              <n-input v-model:value="formValue.cc" size="small" placeholder="CC" />
            </n-form-item>
          </n-col>
        </n-row>
      </n-card>
    </n-space>
    <n-space justify="start" class="pt-3">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button strong secondary type="success" size="medium" @click="handleUpdateClick">
          Update
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
