<template>
  <Dialog
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
    class="w-1/2"
    :header="header"
    :modal="true"
    :closable="false"
  >
    <Form
      :schema="userSchema"
      :fields="formFields"
      :modelValue="formData"
      :loading="loading"
      :showCancel="false"
      :showSubmit="false"
      layout="grid"
      :columns="2"
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
import { useRolefilter } from '@/filters/role';

const { roles, roleLoading, getRoles } = useRolefilter();

const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  roles: z.array(z.number()).optional(),
  status: z.boolean(),
});

type UserFormData = z.infer<typeof userSchema>;

interface Props {
  visible: boolean;
  data?: UserFormData;
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

const formData: Ref<UserFormData> = ref({
  name: '',
  email: '',
  password: '',
  roles: [],
  status: true,
});

const loading: Ref<boolean> = ref(false);

const header = computed(() => (props.isEdit ? 'Edit User' : 'Add User'));

const formFields = computed<FormField[]>(() => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter user name',
    cols: 1,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email',
    cols: 1,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    cols: 2,
  },
  {
    name: 'roles',
    label: 'Select Role',
    type: 'multiselect',
    placeholder: 'Select Roles',
    options: roles.value,
    optionLabel: 'name',
    optionValue: 'id',
    loading: roleLoading.value,
    selectAllLabel: 'Select All Roles',
    cols: 1,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'toggle',
    cols: 1,
  },
]);

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      getRoles();
      if (props.isEdit && props.data) {
        formData.value = { ...props.data };
      } else {
        formData.value = {
          name: '',
          email: '',
          password: '',
          roles: [],
          status: true,
        };
      }
    }
  },
);

const handleCancel = () => {
  emit('update:visible', false);
};

const handleSave = async (values: UserFormData) => {
  loading.value = true;

  try {
    if (values.id) {
      const res: any = await updateRecordApi(`/users/${values.id}`, values);
      window.toast('success', 'Success Message', res.message);
    } else {
      const res: any = await createRecordApi('/users', values);
      window.toast('success', 'Success Message', res.message);
    }
    emit('saved');
    emit('update:visible', false);
  } finally {
    loading.value = false;
  }
};

const handleSaveClick = () => {
  const result = userSchema.safeParse(formData.value);
  if (result.success) {
    handleSave(formData.value);
  }
};
</script>

<style scoped></style>
