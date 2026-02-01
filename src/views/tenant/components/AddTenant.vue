<template>
  <Card>
    <template #content>
      <Divider
        align="center"
        type="dotted"
        :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '0 0 2rem 0' } }"
      >
        <b class="text-xl">Add Organization</b>
      </Divider>
      <Form
        :schema="tenantSchema"
        :fields="formFields"
        :modelValue="formData"
        :loading="loading"
        :showCancel="false"
        :showSubmit="false"
        layout="grid"
        :columns="3"
        @submit="handleSave"
      />
    </template>
    <template #footer>
      <div class="flex gap-4 mt-3 justify-end">
        <Button label="Cancel" variant="outlined" icon="pi pi-times" severity="danger" @click="handleCancel" />
        <Button
          label="Save"
          @click="handleSaveClick"
          variant="outlined"
          severity="success"
          icon="pi pi-save"
          :loading="loading"
        />
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';
import { createRecordApi } from '@/api/endpoints';
import { usePlanfilter } from '@/filters/plan';
import { Form } from '@/components/ui/form';
import type { FormField } from '@/components/ui/form';

const router = useRouter();
const { plans, planLoading, getPlans } = usePlanfilter();

const tenantSchema = z.object({
  tenant_name: z.string().optional(),
  domain_name: z.string().min(1, 'Domain name is required'),
  email: z.string().email('Valid email is required'),
  phone_number: z.string().optional(),
  plan_id: z.number().optional(),
});

type TenantFormData = z.infer<typeof tenantSchema>;

const formData: Ref<TenantFormData> = ref({
  tenant_name: '',
  domain_name: '',
  email: '',
  phone_number: '',
});

const loading: Ref<boolean> = ref(false);

const formFields = computed<FormField[]>(() => [
  {
    name: 'tenant_name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter organization name',
    cols: 1,
  },
  {
    name: 'domain_name',
    label: 'Domain Name',
    type: 'text',
    placeholder: 'Enter domain name',
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
    name: 'phone_number',
    label: 'Phone#',
    type: 'text',
    placeholder: 'Enter phone number',
    cols: 1,
  },
  {
    name: 'plan_id',
    label: 'Select Plan',
    type: 'select',
    placeholder: 'Select Plan',
    options: plans.value,
    optionLabel: 'name',
    optionValue: 'id',
    loading: planLoading.value,
    cols: 1,
  },
]);

const handleSave = async (values: TenantFormData) => {
  loading.value = true;
  try {
    const res: any = await createRecordApi('/tenants', values);
    window.toast('success', 'Organization Information', res.message);
    router.push({ name: 'organization_list' });
  } finally {
    loading.value = false;
  }
};

const handleSaveClick = () => {
  const result = tenantSchema.safeParse(formData.value);
  if (result.success) {
    handleSave(formData.value);
  }
};

const handleCancel = () => {
  router.push({ name: 'organization_list' });
};

onMounted(() => {
  getPlans();
});
</script>

<style scoped></style>
