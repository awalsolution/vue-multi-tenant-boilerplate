<template>
  <Dialog
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
    class="w-1/3"
    :header="header"
    :modal="true"
  >
    <Form
      :schema="planSchema"
      :fields="formFields"
      :modelValue="formData"
      :loading="loading"
      :showCancel="false"
      :showSubmit="false"
      @submit="handleSave"
    />

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" variant="outlined" severity="danger" @click="handleCancel" />
      <Button
        label="Save"
        icon="pi pi-save"
        variant="outlined"
        severity="success"
        @click="handleSaveClick"
        :loading="loading"
      />
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

const planSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  price: z.string().min(1, 'Price is required'),
  type: z.string().min(1, 'Type is required'),
  status: z.boolean(),
});

type PlanFormData = z.infer<typeof planSchema>;

interface Props {
  visible: boolean;
  data?: PlanFormData;
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

const formData: Ref<PlanFormData> = ref({
  name: '',
  price: '',
  type: '',
  status: true,
});

const loading: Ref<boolean> = ref(false);

const header = computed(() => (props.isEdit ? 'Edit Plan' : 'Add Plan'));

const formFields: FormField[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter Plan Name',
  },
  {
    name: 'price',
    label: 'Price',
    type: 'text',
    placeholder: 'Enter Plan Price',
  },
  {
    name: 'type',
    label: 'Type',
    type: 'text',
    placeholder: 'Enter Plan Type',
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
          price: '',
          type: '',
          status: true,
        };
      }
    }
  },
);

const handleCancel = () => {
  emit('update:visible', false);
};

const handleSave = async (values: PlanFormData) => {
  loading.value = true;

  try {
    if (values.id) {
      const res: any = await updateRecordApi(`/plans/${values.id}`, values);
      window.toast('success', 'Success Message', res.message);
    } else {
      const res: any = await createRecordApi('/plans', values);
      window.toast('success', 'Success Message', res.message);
    }
    emit('saved');
    emit('update:visible', false);
  } finally {
    loading.value = false;
  }
};

const handleSaveClick = () => {
  const result = planSchema.safeParse(formData.value);
  if (result.success) {
    handleSave(formData.value);
  }
};
</script>

<style scoped></style>
