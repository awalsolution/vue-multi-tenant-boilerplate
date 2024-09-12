<template>
  <Dialog v-model:visible="addDialog" class="w-1/2" header="Add Permission" :modal="true">
    <div class="flex flex-col gap-6">
      <div>
        <label for="name" class="block font-bold mb-3">Name</label>
        <InputText
          id="name"
          v-model.trim="data.name"
          required="true"
          :invalid="submitted && !data.name"
          fluid
        />
        <small v-if="submitted && !data.name" class="text-red-500">Name is required.</small>
      </div>
      <div>
        <label for="permission_type" class="block font-bold mb-3">Permission Type</label>
        <Select
          id="permission_type"
          v-model="data.type"
          :options="permissionType"
          optionLabel="label"
          placeholder="Select Permission Type"
          fluid
        ></Select>
      </div>
    </div>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
      <Button label="Save" icon="pi pi-check" @click="handleFormSubmit" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Button from 'primevue/button';
import { createRecordApi } from '@src/api/endpoints';

const data: Ref = ref({});
const submitted: Ref = ref(false);
const addDialog: Ref = ref(false);

const emits = defineEmits(['created']);

// function openAddDialog() {
//   data.value = {};
//   submitted.value = false;
// }

function hideDialog() {
  addDialog.value = false;
  submitted.value = false;
}

const handleFormSubmit = () => {
  submitted.value = true;
  createRecordApi('/permission', data.value).then((res: any) => {
    window.toast('success', 'Success Message', res.message);
    emits('created');
  });
  data.value = {};
};

const permissionType = [
  { label: 'Public', key: 'public' },
  { label: 'Private', key: 'private' }
];
</script>

<style lang="scss" scoped></style>
