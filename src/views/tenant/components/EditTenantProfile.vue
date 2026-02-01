<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    modal
    header="Edit Organization Profile"
    class="w-full max-w-2xl"
    :draggable="false"
  >
    <div class="space-y-6">
      <div class="flex flex-col items-center gap-4 mb-4">
        <ImageUploader v-model="formData.logo" />
        <span class="text-sm text-surface-500 text-center">Upload organization logo</span>
      </div>

      <Form
        :schema="tenantSchema"
        :fields="tenantFields"
        v-model="formData"
        :columns="2"
        layout="grid"
        @submit="handleSubmit"
        @cancel="$emit('update:visible', false)"
        :loading="loading"
        submitLabel="Save Changes"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import type { FormField } from '@/components/ui/form';
import { ImageUploader } from '@/components/upload';
import { updateRecordApi } from '@/api/endpoints';

interface Props {
  visible: boolean;
  data: any;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'saved']);

const loading = ref(false);
const formData = ref({ ...props.data });

const tenantSchema = z.object({
  phone_number: z.string().nullish(),
  address: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
  logo: z.string().nullish(),
});

const tenantFields: FormField[] = [
  { name: 'phone_number', label: 'Phone Number', type: 'text' },
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'state', label: 'State', type: 'text' },
  { name: 'country', label: 'Country', type: 'text' },
];

watch(
  () => props.data,
  (newData) => {
    formData.value = { ...newData };
  },
  { deep: true },
);

const handleSubmit = async (values: any) => {
  loading.value = true;
  try {
    const payload = { ...values, logo: formData.value.logo };
    const res: any = await updateRecordApi(`/tenants/edit-single-tenant-profile/${props.data.id}`, payload);
    window.toast('success', 'Profile Updated', res.message);
    emit('saved');
    emit('update:visible', false);
  } catch (error) {
    console.error('Failed to update tenant profile:', error);
  } finally {
    loading.value = false;
  }
};
</script>
