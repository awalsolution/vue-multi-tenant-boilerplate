<template>
  <Dialog :visible="visible" @update:visible="emit('update:visible', $event)" class="w-1/3" :header="header" :modal="true">
    <div class="flex flex-col gap-6">
      <div>
        <label for="name" class="block font-bold mb-3">Name</label>
        <InputText
          id="name"
          v-model.trim="formData.name"
          required="true"
          :invalid="submitted && !formData.name"
          placeholder="Enter permission name"
          fluid
        />
        <small v-if="submitted && !formData.name" class="text-red-500">Name is required.</small>
      </div>
      <div>
        <label for="permission_type" class="block font-bold mb-3">Permission Type</label>
        <Select
          id="permission_type"
          v-model="formData.type"
          :options="permissionType"
          optionLabel="label"
          optionValue="key"
          placeholder="Select Permission Type"
          fluid
        >
        </Select>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="handleCancel" />
      <Button label="Save" icon="pi pi-check" @click="handleSave" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, watch, type Ref } from 'vue';
import { Dialog, Button, InputText, Select } from 'primevue';
import { createRecordApi, updateRecordApi } from '@/api/endpoints';

interface PermissionFormData {
  id?: number;
  name?: string;
  type?: string;
}

interface Props {
  visible: boolean;
  data?: PermissionFormData;
  isEdit?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  isEdit: false,
});

const emit = defineEmits<{
  'update:visible': [value: boolean];
  saved: [];
}>();

const formData: Ref<PermissionFormData> = ref({});
const submitted: Ref<boolean> = ref(false);

const header = ref('Add Permission');

const permissionType = [
  { label: 'Public', key: 'public' },
  { label: 'Private', key: 'private' },
];

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      if (props.isEdit && props.data) {
        header.value = 'Edit Permission';
        formData.value = { ...props.data };
      } else {
        header.value = 'Add Permission';
        formData.value = {};
      }
      submitted.value = false;
    }
  },
);

const handleCancel = () => {
  emit('update:visible', false);
  submitted.value = false;
};

const handleSave = () => {
  submitted.value = true;
  if (formData.value.name?.trim()) {
    if (formData.value.id) {
      updateRecordApi(`/permissions/${formData.value.id}`, formData.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        emit('saved');
        emit('update:visible', false);
      });
    } else {
      createRecordApi('/permissions', formData.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        emit('saved');
        emit('update:visible', false);
      });
    }
    formData.value = {};
  }
};
</script>

<style scoped></style>
