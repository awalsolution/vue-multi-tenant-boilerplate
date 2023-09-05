<template>
  <n-form ref="formRef" :label-width="80" :model="customer" size="small">
    <n-space>
      <n-card title="Personal Information">
        <n-row :gutter="10">
          <n-col :span="12">
            <n-form-item label="First Name" path="first_name">
              <n-input v-model:value="customer.profile.first_name" placeholder="Enter First Name" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Last Name" path="last_name">
              <n-input v-model:value="customer.profile.last_name" placeholder="Enter Last Name" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Email" path="email">
              <n-input v-model:value="customer.email" placeholder="Enter Email" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Phone Number" path="phone_number">
              <n-input
                v-model:value="customer.profile.phone_number"
                placeholder="Enter Phone Number"
              />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Password" path="password">
              <n-input
                v-model:value="customer.password"
                type="password"
                showPasswordOn="click"
                placeholder="Enter Password"
              />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="Street" path="street">
              <n-input v-model:value="customer.profile.street" placeholder="Enter street" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="City" path="city">
              <n-input v-model:value="customer.profile.city" placeholder="Enter City" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="State" path="state">
              <n-input v-model:value="customer.profile.state" placeholder="Enter State" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="Country" path="country">
              <n-input v-model:value="customer.profile.country" placeholder="Enter Country" />
            </n-form-item>
          </n-col>
        </n-row>
      </n-card>
    </n-space>
    <n-space justify="end">
      <n-form-item
        class="mt-3"
        :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }"
      >
        <n-button type="success" @click="handleValidateClick"> Create</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { createRecordApi } from '@/api';
  const formRef = ref<FormInst | null>(null);
  const customer: any = ref({
    profile: {},
  });
  const emits = defineEmits(['created']);

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      console.log('customer info', customer.value);
      if (!errors) {
        createRecordApi('/customers', customer.value).then((result: any) => {
          window['$message'].success(result.message);
          emits('created', result);
        });
      } else {
        console.log(errors);
        window['$message'].error('Please fill out required fields');
      }
    });
  };
</script>

<style lang="less" scoped></style>
