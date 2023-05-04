<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="80" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="site name" path="name">
          <n-input v-model:value="formValue.name" placeholder="Please enter the website name" />
        </n-form-item>

        <n-form-item label="Record Number" path="icpCode">
          <n-input placeholder="Please enter the filing number" v-model:value="formValue.icpCode" />
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

        <n-form-item label="login verification code" path="loginCode">
          <n-radio-group v-model:value="formValue.loginCode" name="loginCode">
            <n-space>
              <n-radio :value="1">Enable</n-radio>
              <n-radio :value="0">Close</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="Website Open Access" path="systemOpen">
          <n-switch
            size="large"
            v-model:value="formValue.systemOpen"
            @update:value="systemOpenChange"
          />
        </n-form-item>

        <n-form-item label="Site Closing Prompt" path="closeText">
          <n-input
            v-model:value="formValue.closeText"
            type="textarea"
            placeholder="Please enter the website closing prompt"
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

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';

  const rules = {
    name: {
      required: true,
      message: 'Please enter a website name',
      trigger: 'blur',
    },
    mobile: {
      required: true,
      message: 'Please enter a contact number',
      trigger: 'input',
    },
  };

  export default defineComponent({
    setup() {
      const formRef: any = ref(null);
      const message = useMessage();
      const dialog = useDialog();

      const state = reactive({
        formValue: {
          name: '',
          mobile: '',
          icpCode: '',
          address: '',
          loginCode: 0,
          closeText:
            'The website is under maintenance, temporarily unavailable! This website is undergoing system maintenance and technical upgrades, the website is temporarily unavailable, please understand!',
          systemOpen: true,
        },
      });

      function systemOpenChange(value) {
        if (!value) {
          dialog.warning({
            title: 'Prompt',
            content:
              'Are you sure you want to close system access? This operation will take effect immediately, please operate with caution! ',
            positiveText: 'OK',
            negativeText: 'Cancel',
            onPositiveClick: () => {
              message.success('Operation succeeded');
            },
            onNegativeClick: () => {
              state.formValue.systemOpen = true;
            },
          });
        }
      }

      function formSubmit() {
        formRef.value.validate((errors) => {
          if (!errors) {
            message.success('Verification succeeded');
          } else {
            message.error('Verification failed, please fill in complete information');
          }
        });
      }

      function resetForm() {
        formRef.value.restoreValidation();
      }

      return {
        formRef,
        ...toRefs(state),
        rules,
        formSubmit,
        resetForm,
        systemOpenChange,
      };
    },
  });
</script>
