<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="80" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="nickname" path="name">
          <n-input v-model:value="formValue.name" placeholder="Please enter a nickname" />
        </n-form-item>

        <n-form-item label="email" path="email">
          <n-input placeholder="Please enter your email address" v-model:value="formValue.email" />
        </n-form-item>

        <n-form-item label="Contact number" path="mobile">
          <n-input placeholder="Please enter the contact number" v-model:value="formValue.mobile" />
        </n-form-item>

        <n-form-item label="Contact Address" path="address">
          <n-input
            v-model:value="formValue.address"
            type="textarea"
            placeholder="Please enter the contact address"
          />
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">Update basic information</n-button>
          </n-space>
        </div>
      </n-form>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useMessage } from 'naive-ui';

  const rules = {
    name: {
      required: true,
      message: 'Please enter a nickname',
      trigger: 'blur',
    },
    email: {
      required: true,
      message: 'Please enter your email address',
      trigger: 'blur',
    },
    mobile: {
      required: true,
      message: 'Please enter a contact number',
      trigger: 'input',
    },
  };
  const formRef: any = ref(null);
  const message = useMessage();

  const formValue = reactive({
    name: '',
    mobile: '',
    email: '',
    address: '',
  });

  function formSubmit() {
    formRef.value.validate((errors) => {
      if (!errors) {
        message.success('Verification succeeded');
      } else {
        message.error('Verification failed, please fill in complete information');
      }
    });
  }
</script>
