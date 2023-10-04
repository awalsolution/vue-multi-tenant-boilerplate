<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-space vertical>
      <n-row gutter="10">
        <n-col :span="16">
          <n-card
            title="Purchase Order Details"
            :theme-overrides="cardStyle"
            size="small"
            :header-style="headerStyle"
            :content-style="contentStyle"
          >
            <n-row gutter="10">
              <n-col :span="8">
                <n-form-item label="Expected Date" path="expected_date">
                  <n-date-picker
                    v-model:formatted-value="formValue.expected_date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    clearable
                    placeholder="Pick a Date"
                    class="w-full"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="Status" path="status">
                  <n-select
                    v-model:value="formValue.status"
                    size="small"
                    :options="[
                      { label: 'Draft', value: 'draft' },
                      { label: 'Ordered', value: 'ordered' },
                      { label: 'Received', value: 'received' },
                      { label: 'Quantity Checked', value: 'quantity_checked' },
                      { label: 'Quality Checked', value: 'quality_checked' },
                      { label: 'Putaway', value: 'putaway' }
                    ]"
                    clearable
                    :remote="true"
                    :filterable="true"
                    :clear-filter-after-select="false"
                    placeholder="Search Status"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="Supplier" path="supplier_id">
                  <n-select
                    :filterable="true"
                    :tag="false"
                    placeholder="Search Supplier"
                    v-model:value="formValue.supplier_id"
                    clearable
                    @focus="getSupplierOnFocus"
                    :remote="true"
                    :clear-filter-after-select="false"
                    label-field="supplier_name"
                    value-field="id"
                    :loading="supplierLoading"
                    :options="supplier"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="PO Type" path="purchase_order_type">
                  <n-select
                    v-model:value="formValue.purchase_order_type"
                    size="small"
                    :options="[
                      { label: 'Regular', value: 'regular' },
                      { label: 'Pre Order', value: 'pre_order' }
                    ]"
                    placeholder="Search PO type"
                    clearable
                    :remote="true"
                    :filterable="true"
                    :clear-filter-after-select="false"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="Pre Order Text" path="pre_order_text">
                  <n-input
                    v-model:value="formValue.pre_order_text"
                    size="small"
                    placeholder="Pre Order Text"
                  />
                </n-form-item>
              </n-col>
            </n-row>
          </n-card>
        </n-col>
        <n-col :span="8">
          <n-card
            title="Merchant / WareHouse Info"
            :theme-overrides="cardStyle"
            size="small"
            :header-style="headerStyle"
            :content-style="contentStyle"
          >
            <n-form-item :span="12" label="Merchant" path="merchant_id">
              <n-select
                :filterable="true"
                multiple
                :tag="false"
                placeholder="Select Merchant"
                v-model:value="formValue.merchant_id"
                clearable
                @focus="getMerchantsOnFocus"
                :remote="true"
                :clear-filter-after-select="false"
                label-field="merchant_name"
                value-field="id"
                :loading="merchantLoading"
                :options="merchants"
              />
            </n-form-item>
            <n-form-item :span="12" label="Warehouse" path="warehouse_id">
              <n-select
                :filterable="true"
                :tag="false"
                placeholder="Select warehouse"
                v-model:value="formValue.warehouse_id"
                clearable
                @focus="getWarehouseOnFocus"
                :remote="true"
                :clear-filter-after-select="false"
                label-field="warehouse_name"
                value-field="id"
                :loading="warehouseLoading"
                :options="warehouse"
              />
            </n-form-item>
          </n-card>
        </n-col>
      </n-row>
      <n-row gutter="10">
        <n-card
          title="Additional Details"
          :theme-overrides="cardStyle"
          size="small"
          :header-style="headerStyle"
          :content-style="contentStyle"
        >
          <n-form-item label="Notes">
            <n-input
              size="small"
              type="textarea"
              :autosize="{
                minRows: 2,
                maxRows: 5
              }"
            />
          </n-form-item>
        </n-card>
      </n-row>
    </n-space>
    <n-space justify="start" class="pt-3">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button strong secondary type="success" size="medium" @click="handleCreateClick">
          Create
        </n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { type FormInst } from 'naive-ui';
// import { createRecordApi } from '@src/api/endpoints';
import { rules } from '@src/rules/purchase_rules';
import { usefilterSupplier } from '@src/filters/supplier';
import { usefilterMerchant } from '@src/filters/merchants';
import { usefilterWarehouse } from '@src/filters/warehouse';

const { supplier, supplierLoading, getSupplierOnFocus } = usefilterSupplier();
const { merchants, merchantLoading, getMerchantsOnFocus } = usefilterMerchant();
const { warehouse, warehouseLoading, getWarehouseOnFocus } = usefilterWarehouse();
const formValue: any = ref({});
const formRef = ref<FormInst | null>(null);

// const emits = defineEmits(['created']);

const handleCreateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('submitted data =>', formValue.value);
      window['$message'].success('Successfully click on Reset Button look data in console');
      // createRecordApi('/merchants', formValue.value).then((res: any) => {
      //   window['$message'].success(res.message);
      //   emits('created', res.result);
      // });
    } else {
      console.log(errors);
      window['$message'].error('Please fill out required fields');
    }
  });
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
