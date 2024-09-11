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
  <!-- <Button label="Save" :fluid="false" @click="handleFormSubmit"></Button> -->
  <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
  <Button label="Save" icon="pi pi-check" @click="handleFormSubmit" />
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Button from 'primevue/button';
import { createRecordApi } from '@src/api/endpoints';

const data: Ref = ref({});

const emits = defineEmits(['created', 'cancle']);

const hideDialog = () => {
  emits('cancle', false);
};

const handleFormSubmit = (e: MouseEvent) => {
  e.preventDefault();
  createRecordApi('/permission', data.value).then((res: any) => {
    window.toast('success', 'Success Message', res.message);
    emits('created', res.data);
  });
};

const permissionType = [
  { label: 'Public', key: 'public' },
  { label: 'Private', key: 'private' }
];
</script>

<style lang="scss" scoped></style>
