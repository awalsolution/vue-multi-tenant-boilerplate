<template>
  <Dialog
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
    class="w-1/3"
    :header="header"
    :modal="true"
  >
    <Form
      :schema="roleSchema"
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

const roleSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  status: z.boolean(),
});

type RoleFormData = z.infer<typeof roleSchema>;

interface Props {
  visible: boolean;
  data?: RoleFormData;
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

const formData: Ref<RoleFormData> = ref({
  name: '',
  status: true,
});

const loading: Ref<boolean> = ref(false);

const header = computed(() => (props.isEdit ? 'Edit Role' : 'Add Role'));

const formFields: FormField[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter role name',
  },
  {
    name: 'status',
    label: 'Status',
    type: 'toggle',
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
          status: true,
        };
      }
    }
  },
);

const handleCancel = () => {
  emit('update:visible', false);
};

const handleSave = async (values: RoleFormData) => {
  loading.value = true;

  try {
    if (values.id) {
      const res: any = await updateRecordApi(`/roles/${values.id}`, values);
      window.toast('success', 'Success Message', res.message);
    } else {
      const res: any = await createRecordApi('/roles', values);
      window.toast('success', 'Success Message', res.message);
    }
    emit('saved');
    emit('update:visible', false);
  } finally {
    loading.value = false;
  }
};

const handleSaveClick = () => {
  const result = roleSchema.safeParse(formData.value);
  if (result.success) {
    handleSave(formData.value);
  }
};
</script>

<style scoped></style>
