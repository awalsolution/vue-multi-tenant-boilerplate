<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    modal
    header="Edit Profile"
    class="w-full max-w-2xl"
    :draggable="false"
  >
    <div class="space-y-6">
      <div class="flex flex-col items-center gap-4 mb-4">
        <ImageUploader v-model="formData.profile_picture" />
        <span class="text-sm text-surface-500 text-center">Upload profile picture</span>
      </div>

      <Form
        :schema="profileSchema"
        :fields="profileFields"
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

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone_number: z.string().nullish(),
  address: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  country: z.string().nullish(),
  profile_picture: z.string().nullish(),
});

const profileFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text' },
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
    const payload = { ...values, profile_picture: formData.value.profile_picture };
    const res: any = await updateRecordApi(`/users/profile/${props.data.id}`, payload);
    window.toast('success', 'Profile Updated', res.message);
    emit('saved');
    emit('update:visible', false);
  } catch (error) {
    console.error('Failed to update profile:', error);
  } finally {
    loading.value = false;
  }
};
</script>
