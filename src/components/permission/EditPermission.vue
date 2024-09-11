<template>
  <div class="flex flex-wrap gap-4">
    <div class="flex flex-col grow basis-0 gap-2">
      <label for="name">Name</label>
      <InputText id="name" type="text" v-model="data.name" />
    </div>
    <div class="flex flex-wrap gap-2 w-full">
      <label for="permission_type">Permission Type</label>
      <Select
        id="permission_type"
        v-model="data.type"
        :options="permissionType"
        optionLabel="key"
        placeholder="Select Permisnon Type"
        class="w-full"
      ></Select>
    </div>
  </div>
  <Button label="Save" :fluid="false" @click="handleFormSubmit"></Button>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';

const data: Ref = ref({});
const emits = defineEmits(['updated']);
const props = defineProps({
  id: {
    type: Number
  }
});
// get permission for update
getRecordApi(`/permission/${props.id}`).then((res: any) => {
  data.value = res.data;
});

const handleFormSubmit = (e: MouseEvent) => {
  e.preventDefault();
  updateRecordApi(`/permission/${data.value.id}`, data.value).then((res: any) => {
    window.toast('success', 'Success Message', res.message);
    emits('updated', res.data);
  });
};

const permissionType = [
  { label: 'Public', key: 'public' },
  { label: 'Private', key: 'private' }
];
</script>

<style lang="scss" scoped></style>
