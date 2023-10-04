<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-card
      title="Warehouse Details"
      :theme-overrides="cardStyle"
      size="small"
      :header-style="headerStyle"
      :content-style="contentStyle"
    >
      <n-row gutter="10">
        <n-col :span="8">
          <n-form-item label="Name" path="warehouse_name">
            <n-input
              v-model:value="formValue.warehouse_name"
              size="small"
              placeholder="Enter Name"
            />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="Phone" path="warehouse_phone">
            <n-input
              v-model:value="formValue.warehouse_phone"
              size="small"
              placeholder="Enter Phone"
            />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="Status" path="warehouse_status">
            <n-select
              v-model:value="formValue.warehouse_status"
              size="small"
              :options="[
                { label: 'Active', value: 'active' },
                { label: 'Disabled', value: 'disabled' }
              ]"
              placeholder="Search Status"
              clearable
              :remote="true"
              :filterable="true"
              :clear-filter-after-select="false"
            />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="Address" path="warehouse_address">
            <n-input
              v-model:value="formValue.warehouse_address"
              size="small"
              placeholder="Enter Address"
            />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="City" path="warehouse_city">
            <n-input
              v-model:value="formValue.warehouse_city"
              size="small"
              placeholder="Enter City"
            />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="State" path="warehouse_state">
            <n-input
              v-model:value="formValue.warehouse_state"
              size="small"
              placeholder="Enter State"
            />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="Country" path="warehouse_country">
            <n-input
              v-model:value="formValue.warehouse_country"
              size="small"
              placeholder="Enter Country"
            />
          </n-form-item>
        </n-col>
        <n-col :span="8" v-if="isSuperAdminUser()">
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
      createRecordApi('/warehouse', formValue.value).then((res: any) => {
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
  warehouse_name: {
    required: true,
    message: 'Please Enter Name',
    trigger: 'blur'
  }
});
</script>

<style lang="scss" scoped></style>
