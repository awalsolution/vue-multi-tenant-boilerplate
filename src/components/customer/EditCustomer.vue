<template>
  <n-form ref="formRef" :label-width="80" :model="customer" :rules="rules" size="small">
    <n-space>
      <n-card title="Personal Information">
        <n-row :gutter="10">
          <n-col :span="12">
            <n-form-item label="First Name" path="first_name">
              <n-input v-model:value="customer.first_name" placeholder="Enter First Name" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Last Name" path="last_name">
              <n-input v-model:value="customer.last_name" placeholder="Enter Last Name" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Email" path="email">
              <n-input v-model:value="customer.email" placeholder="Enter Email" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Phone Number" path="phone_number">
              <n-input v-model:value="customer.phone_number" placeholder="Enter Phone Number" />
            </n-form-item>
          </n-col>
        </n-row>
      </n-card>
      <n-card title="Billing Address">
        <n-row :gutter="10">
          <n-col :span="12">
            <n-form-item :span="12" label="First Name" path="first_name">
              <n-input
                v-model:value="customer.billing_address.first_name"
                placeholder="Enter First Name"
              />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="Last Name" path="last_name">
              <n-input
                v-model:value="customer.billing_address.last_name"
                placeholder="Enter Last Name"
              />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="Address Phone Number" path="phone_number">
              <n-input
                v-model:value="customer.billing_address.phone_number"
                placeholder="Enter Phone Number"
              />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="Street" path="street">
              <n-input v-model:value="customer.billing_address.street" placeholder="Enter street" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="City" path="city">
              <n-input v-model:value="customer.billing_address.city" placeholder="Enter City" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="State" path="state">
              <n-input v-model:value="customer.billing_address.state" placeholder="Enter State" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="Country" path="country">
              <n-input
                v-model:value="customer.billing_address.country"
                placeholder="Enter Country"
              />
            </n-form-item>
          </n-col>
        </n-row>
      </n-card>
      <n-card title="Shipping Address">
        <n-row :gutter="10">
          <n-col :span="12">
            <n-form-item :span="12" label="First Name" path="first_name">
              <n-input
                v-model:value="customer.shipping_address.first_name"
                placeholder="Enter First Name"
              />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="Last Name" path="last_name">
              <n-input
                v-model:value="customer.shipping_address.last_name"
                placeholder="Enter Last Name"
              />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="Address Phone Number" path="phone_number">
              <n-input
                v-model:value="customer.shipping_address.phone_number"
                placeholder="Enter Phone Number"
              />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="Street" path="street">
              <n-input
                v-model:value="customer.shipping_address.street"
                placeholder="Enter street"
              />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="City" path="city">
              <n-input v-model:value="customer.shipping_address.city" placeholder="Enter City" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="State" path="state">
              <n-input v-model:value="customer.shipping_address.state" placeholder="Enter State" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item :span="12" label="Country" path="country">
              <n-input
                v-model:value="customer.shipping_address.country"
                placeholder="Enter Country"
              />
            </n-form-item>
          </n-col>
        </n-row>
      </n-card>
    </n-space>
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
  import { getRecordApi, updateRecordApi } from '@/api';

  const formRef = ref<FormInst | null>(null);
  const customer: any = ref({
    billing_address: {},
    shipping_address: {},
  });

  const emits = defineEmits(['updated']);

  const props = defineProps({
    id: {
      type: Number,
    },
  });
  // fetch single user using id
  getRecordApi(`/customers/${props.id}`).then((result) => {
    customer.value = result;
  });

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        updateRecordApi(`/customers/${customer.value.id}`, customer.value).then((result: any) => {
          window['$message'].success(result.message);
          emits('updated', result);
        });
      } else {
        console.log(errors);
        window['$message'].error('Invalid');
      }
    });
  };
  const rules = ref({
    first_name: {
      required: true,
      message: 'Please Enter First Name',
      trigger: 'blur',
    },
    last_name: {
      required: true,
      message: 'Please Enter last Name',
      trigger: 'blur',
    },
    email: {
      required: true,
      message: 'Please Enter email',
      trigger: 'blur',
    },
    password: {
      required: true,
      message: 'Please Enter Password',
      trigger: 'blur',
    },
    phone: {
      required: true,
      message: 'Please Enter Password',
      trigger: 'blur',
    },
  });
</script>

<style lang="less" scoped></style>
