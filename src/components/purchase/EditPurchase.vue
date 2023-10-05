<template>
  <ContentLayout>
    <div>purchase edit page</div>
  </ContentLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { type FormInst } from 'naive-ui';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import ContentLayout from '@src/layouts/ContentLayout/index.vue';

const route = useRoute();
const formRef = ref<FormInst | null>(null);
const formValue: any = ref({});

// fetch single purchase  using id
getRecordApi('/purchase/' + route.params.id).then((res: any) => {
  formValue.value = res.result;
});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateRecordApi('/purchase/' + formValue.value.id, formValue.value).then((res: any) => {
        window['$message'].success(res.message);
      });
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
    }
  });
};

const rules = ref({
  merchant_name: {
    required: true,
    message: 'Please Enter Name',
    trigger: 'blur'
  },
  status: {
    required: true,
    message: 'Please select status',
    trigger: 'blur'
  }
});
</script>

<style lang="scss" scoped></style>
