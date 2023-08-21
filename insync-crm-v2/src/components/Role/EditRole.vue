<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-form-item style="padding-top: 24px" label="Name" path="name">
      <n-input v-model:value="formValue.name" placeholder="Edit Name" />
    </n-form-item>
    <n-form-item label="Permissions" path="permissions">
      <permission-selector
        v-model:value="formValue.permissions"
        label-field="name"
        value-field="id"
        :tag="true"
      />
    </n-form-item>
    <n-space justify="end">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button type="success" @click="handleValidateClick"> Update</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst, useMessage } from 'naive-ui';
  import { getRecordApi, updateRecordApi } from '@src/api/endpoints';

  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const message: any = useMessage();

  const emits = defineEmits(['updated']);
  const props = defineProps({
    id: {
      type: Number,
    },
  });
  // fetch single Role  using id
  getRecordApi(`/roles/${props.id}`).then((result: any) => {
    console.log(result);
    formValue.value = result.result;
    formValue.value.permissions = formValue.value.permissions.map((v: any) => v.id);
  });
  console.log(formValue);
  const rules = ref({
    name: {
      required: true,
      message: 'Please Enter Name',
      trigger: 'blur',
    },
  });

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        updateRecordApi(`/roles/${formValue.value.id}`, formValue.value).then((result: any) => {
          message.success(result.message);
          emits('updated', result);
        });
      } else {
        console.log(errors);
        message.error('Invalid');
      }
    });
  };
</script>

<style lang="less" scoped></style>
