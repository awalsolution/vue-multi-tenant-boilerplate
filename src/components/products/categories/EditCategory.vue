<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-form-item style="padding-top: 24px" label="Name" path="name">
      <n-input v-model:value="formValue.name" placeholder="Edit Name" />
    </n-form-item>
    <BasicUpload
      :action="uploadUrl"
      :data="{ type: 0 }"
      name="categoriesImages"
      :width="100"
      :height="100"
      @upload-change="uploadChange"
      v-model:value="formValue.image"
    />
    <n-space justify="end">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button type="success" @click="handleValidateClick"> Update</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { updateRecordApi, getRecordApi } from '@/api';
  import { BasicUpload } from '@/components/Upload';
  import { useGlobSetting } from '@/hooks/setting';

  const globSetting = useGlobSetting();
  const { uploadUrl } = globSetting;
  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const emits = defineEmits(['updated']);

  const uploadChange = (list: string) => {
    formValue.value.image = unref(list);
  };

  const props = defineProps({
    id: {
      type: Number,
    },
  });
  // get category for update
  getRecordApi(`/categories/${props.id}`).then((result: any) => (formValue.value = result));

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
        console.log(formValue.value);
        updateRecordApi(`/categories/${formValue.value.id}`, formValue.value).then((result) => {
          window['$message'].success(result.message);
          emits('updated', result);
        });
      } else {
        console.log(errors);
        window['$message'].error('Invalid');
      }
    });
  };
</script>

<style lang="less" scoped></style>
