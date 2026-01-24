<template>
  <Dialog
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
    class="w-1/3"
    :header="header"
    :modal="true"
  >
    <Form
      :schema="permissionSchema"
      :fields="formFields"
      :modelValue="formData"
      :loading="loading"
      :showCancel="false"
      :showSubmit="false"
      @submit="handleSave"
    />

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="handleCancel" />
      <Button label="Save" icon="pi pi-check" @click="handleSaveClick" :loading="loading" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed, type Ref } from 'vue';
import { z } from 'zod';
import { Dialog, Button } from 'primevue';
import { createRecordApi, updateRecordApi } from '@/api/endpoints';
import { Form } from '@/components/ui/form';
import type { FormField } from '@/components/ui/form';

const permissionSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['public', 'private']),
});

type PermissionFormData = z.infer<typeof permissionSchema>;

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

const formData: Ref<PermissionFormData> = ref({
  name: '',
  type: 'public',
});

const loading: Ref<boolean> = ref(false);
const formRef = ref();

const header = computed(() => (props.isEdit ? 'Edit Permission' : 'Add Permission'));

const formFields: FormField[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter permission name',
  },
  {
    name: 'type',
    label: 'Permission Type',
    type: 'select',
    placeholder: 'Select Permission Type',
    options: [
      { label: 'Public', value: 'public' },
      { label: 'Private', value: 'private' },
    ],
  },
];

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      if (props.isEdit && props.data) {
        formData.value = { ...props.data };
      } else {
        formData.value = {
          name: '',
          type: 'public',
        };
      }
    }
  },
);

const handleCancel = () => {
  emit('update:visible', false);
};

const handleSave = async (values: PermissionFormData) => {
  loading.value = true;

  try {
    if (values.id) {
      const res: any = await updateRecordApi(`/permissions/${values.id}`, values);
      window.toast('success', 'Success Message', res.message);
    } else {
      const res: any = await createRecordApi('/permissions', values);
      window.toast('success', 'Success Message', res.message);
    }
    emit('saved');
    emit('update:visible', false);
  } finally {
    loading.value = false;
  }
};

const handleSaveClick = () => {
  const result = permissionSchema.safeParse(formData.value);
  if (result.success) {
    handleSave(formData.value);
  }
};
</script>

<style scoped></style>
