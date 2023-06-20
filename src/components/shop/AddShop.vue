<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-grid x-gap="10">
      <n-form-item-gi :span="8" class="pt-6" label="Name" path="shop_name">
        <n-input v-model:value="formValue.shop_name" placeholder="Enter Name" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" class="pt-6" label="Phone" path="shop_phone">
        <n-input v-model:value="formValue.shop_phone" placeholder="Enter Phone" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" class="pt-6" label="Address" path="address">
        <n-input v-model:value="formValue.address" placeholder="Enter Address" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="City" path="city">
        <n-input v-model:value="formValue.city" placeholder="Enter City" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" style="padding-top: 4px" label="State" path="state">
        <n-input v-model:value="formValue.state" placeholder="Enter State" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" style="padding-top: 4px" label="Country" path="country">
        <n-input v-model:value="formValue.country" placeholder="Enter Country" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" style="padding-top: 4px" label="Logo" path="shop_logo">
        <n-input v-model:value="formValue.shop_logo" placeholder="Enter Logo" />
      </n-form-item-gi>
    </n-grid>
    <n-space justify="end">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button type="success" @click="handleValidateClick"> Create</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { createRecordApi } from '@/api';

  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const emits = defineEmits(['created']);
  const rules = ref({
    shop_name: {
      required: true,
      message: 'Please Enter Name',
      trigger: 'blur',
    },
    shop_phone: {
      required: true,
      message: 'Please Enter Phone',
      trigger: 'blur',
    },
    address: {
      required: true,
      message: 'Please Enter Address',
      trigger: 'blur',
    },
    city: {
      required: true,
      message: 'Please Enter City',
      trigger: 'blur',
    },
    state: {
      required: true,
      message: 'Please Enter State',
      trigger: 'blur',
    },
    country: {
      required: true,
      message: 'Please Enter Country',
      trigger: 'blur',
    },
    shop_logo: {
      required: true,
      message: 'Please Upload Logo',
      trigger: 'blur',
    },
  });

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        createRecordApi('/shops', formValue.value).then((result: any) => {
          window['$message'].success(result.message);
          emits('created', result.result);
        });
      } else {
        console.log(errors);
        window['$message'].error('Please fill out required fields');
      }
    });
  };
</script>

<style lang="less" scoped></style>
