<template>
  <div class="file-uploader flex gap-6 mt-4 items-center">
    <img
      v-if="previewUrl"
      :src="imgUrl + previewUrl"
      alt="Uploaded Image Preview"
      class="shadow-md rounded-xl size-16"
    />
    <FileUpload
      mode="basic"
      auto
      severity="primary"
      accept="image/*"
      @upload="handleUpload"
      :url="uploadUrl"
      name="image"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, type Ref } from 'vue';
import { useEnv } from '@src/hooks/useEnv';
import FileUpload from 'primevue/fileupload';

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const { imgUrl, uploadUrl } = useEnv();
const previewUrl: Ref = ref(props.modelValue || null);

watch(
  () => props.modelValue,
  (newValue) => {
    previewUrl.value = newValue;
  }
);

const handleUpload = (e: any) => {
  const response = e.xhr.response;
  let res;
  try {
    res = JSON.parse(response);
    previewUrl.value = res.data;
    emit('update:modelValue', res.data);
    window.toast('success', 'Success Message', res.message);
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
  }
};
</script>

<style lang="scss" scoped></style>
