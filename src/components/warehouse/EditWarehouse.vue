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
        <n-col :span="24">
          <n-form-item label="Warehouse Name" path="warehouse_name">
            <n-input
              v-model:value="formValue.warehouse_name"
              size="small"
              placeholder="Warehouse Name"
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
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';

const formRef = ref<FormInst | null>(null);
const formValue: any = ref({});

const emits = defineEmits(['updated']);
const props = defineProps({
  id: {
    type: Number
  }
});

// fetch single warehouse  using id
getRecordApi('/merchants/' + props.id).then((res: any) => {
  formValue.value = res.result;
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
