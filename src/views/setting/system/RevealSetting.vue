<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="120" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="Item image (large)">
          <n-space align="center">
            <span>Width:</span>
            <n-input
              v-model:value="formValue.bigWidth"
              style="width: 80px"
              placeholder="width pixels"
            />
            <span>Height:</span>
            <n-input
              v-model:value="formValue.bigHeight"
              style="width: 80px"
              placeholder="height pixels"
            />
          </n-space>
        </n-form-item>

        <n-form-item label="Item image (small)">
          <n-space align="center">
            <span>Width:</span>
            <n-input
              v-model:value="formValue.smallWidth"
              style="width: 80px"
              placeholder="width pixels"
            />
            <span>Height:</span>
            <n-input
              v-model:value="formValue.smallHeight"
              style="width: 80px"
              placeholder="height pixels"
            />
          </n-space>
        </n-form-item>

        <n-form-item label="watermark transparency" path="watermarkClarity">
          <n-input-number
            v-model:value="formValue.watermarkClarity"
            :show-button="false"
            placeholder="Please enter watermark transparency"
          />
        </n-form-item>

        <n-form-item label="watermark image" path="watermarkClarity">
          <n-upload action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f">
            <n-button>Upload file</n-button>
          </n-upload>
        </n-form-item>

        <n-form-item label="Watermark Place" path="watermarkPlace">
          <n-select
            placeholder="Please select the exact price method"
            :options="watermarkPlaceList"
            v-model:value="formValue.watermarkPlace"
          />
        </n-form-item>

        <n-form-item label="price precise number of digits" path="pricePreciseNum">
          <n-select
            placeholder="Please select the exact number of digits for the price"
            :options="pricePreciseNumList"
            v-model:value="formValue.pricePreciseNum"
          />
        </n-form-item>

        <n-form-item label="Price Precise Way" path="pricePrecise">
          <n-select
            placeholder="Please select the exact price method"
            :options="pricePreciseList"
            v-model:value="formValue.pricePrecise"
          />
        </n-form-item>

        <n-form-item label="The market price is displayed at the front desk" path="isMarketPrice">
          <n-switch size="large" v-model:value="formValue.isMarketPrice" />
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">Update display information</n-button>
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
  const watermarkPlaceList = [
    {
      label: 'upper left',
      value: 1,
    },
    {
      label: 'upper right',
      value: 2,
    },
    {
      label: 'centered',
      value: 3,
    },
    {
      label: 'bottom right',
      value: 4,
    },
  ];
  const pricePreciseNumList = [
    {
      label: '2 digits',
      value: 1,
    },
    {
      label: '3 digits',
      value: 2,
    },
    {
      label: '4 digits',
      value: 3,
    },
  ];
  const pricePreciseList = [
    {
      label: 'rounded',
      value: 1,
    },
    {
      label: 'round up',
      value: 2,
    },
    {
      label: 'round down',
      value: 3,
    },
  ];

  export default defineComponent({
    setup() {
      const formRef: any = ref(null);
      const message = useMessage();
      const dialog = useDialog();

      const state = reactive({
        formValue: {
          bigWidth: '',
          bigHeight: '',
          smallWidth: '',
          smallHeight: '',
          watermarkClarity: null,
          pricePrecise: 1,
          isMarketPrice: true,
          pricePreciseNum: null,
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
        pricePreciseList,
        watermarkPlaceList,
        pricePreciseNumList,
        rules,
        formSubmit,
        resetForm,
        systemOpenChange,
      };
    },
  });
</script>
