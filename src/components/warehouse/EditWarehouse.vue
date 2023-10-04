<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-card
      title="Warehouse Detail"
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
          <n-form-item label="Status" path="status">
            <n-select
              v-model:value="formValue.status"
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
          <n-form-item label="Address" path="address">
            <n-input v-model:value="formValue.address" size="small" placeholder="Enter Address" />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="City" path="city">
            <n-input v-model:value="formValue.city" size="small" placeholder="Enter City" />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="State" path="state">
            <n-input v-model:value="formValue.state" size="small" placeholder="Enter State" />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="Country" path="country">
            <n-input v-model:value="formValue.country" size="small" placeholder="Enter Country" />
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
        <n-button strong secondary type="success" size="medium" @click="handleUpdateClick">
          Update
        </n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import { isSuperAdminUser } from '@src/checks/isSuperAdmin';
import { rules } from '@src/rules/warehouse_rules';
import { usefilterShop } from '@src/filters/shops';

const { shops, shopLoading, getShops, getShopsOnFocus } = usefilterShop();
const formRef = ref<FormInst | null>(null);
const formValue: any = ref({});

const emits = defineEmits(['updated']);
const props = defineProps({
  id: {
    type: Number
  }
});

// fetch single warehouse  using id
getRecordApi('/warehouse/' + props.id).then((res: any) => {
  formValue.value = res.result;
  getShops();
});

const handleUpdateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateRecordApi('/warehouse/' + formValue.value.id, formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('updated', res.result);
      });
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
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
