<template>
  <div class="p-6 mx-auto">
    <div class="flex flex-col md:flex-row gap-6">
      <div class="w-full md:w-1/3 flex flex-col gap-6">
        <div class="bg-surface-card p-6 rounded shadow-sm border border-surface-200">
          <div class="flex flex-col items-center text-center">
            <div class="relative mb-4">
              <Avatar
                v-if="data?.logo"
                :image="imgUrl + data?.logo"
                shape="square"
                size="xlarge"
                class="w-32 h-32 border-4 border-primary shadow-lg p-2 bg-white flex items-center justify-center overflow-hidden"
              />
              <div
                v-else
                class="w-32 h-32 border-4 border-surface-200 rounded-lg flex items-center justify-center bg-surface-50"
              >
                <i class="pi pi-building text-4xl text-surface-400" />
              </div>
            </div>
            <h1 class="text-2xl font-bold text-surface-900 mb-1">{{ data?.name }}</h1>
            <p class="text-surface-500 mb-6">{{ data?.tenant_api_key }}</p>
            <Button
              label="Edit Organization"
              icon="pi pi-building-edit"
              class="w-full rounded"
              @click="openEditDialog"
            />
          </div>
        </div>

        <div class="bg-surface-card p-6 rounded shadow-sm border border-surface-200">
          <h3 class="text-lg font-semibold text-surface-900 mb-4">Organization Detail</h3>
          <div class="flex items-center justify-between py-2 border-b border-surface-100">
            <span class="text-surface-600">ID</span>
            <span class="text-surface-900 font-medium font-mono">{{ data?.id }}</span>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-surface-600">Created At</span>
            <span class="text-surface-900 font-medium">{{ formatDate(data?.created_at) }}</span>
          </div>
        </div>
      </div>

      <div class="w-full md:w-2/3">
        <div class="bg-surface-card p-8 rounded shadow-sm border border-surface-200 h-full">
          <h2 class="text-xl font-bold text-surface-900 mb-6 pb-2 border-b border-surface-100">
            Organization Profile Information
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-1">
              <label class="text-sm font-semibold text-surface-500 uppercase tracking-wider">Organization Name</label>
              <p class="text-lg text-surface-900">{{ data?.name || 'N/A' }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-semibold text-surface-500 uppercase tracking-wider">Contact Number</label>
              <p class="text-lg text-surface-900">{{ data?.phone_number || 'N/A' }}</p>
            </div>
            <div class="col-span-1 md:col-span-2 space-y-1">
              <label class="text-sm font-semibold text-surface-500 uppercase tracking-wider">Address</label>
              <p class="text-lg text-surface-900">{{ data?.address || 'N/A' }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-semibold text-surface-500 uppercase tracking-wider">City</label>
              <p class="text-lg text-surface-900">{{ data?.city || 'N/A' }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-semibold text-surface-500 uppercase tracking-wider">State / Province</label>
              <p class="text-lg text-surface-900">{{ data?.state || 'N/A' }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-semibold text-surface-500 uppercase tracking-wider">Country</label>
              <p class="text-lg text-surface-900">{{ data?.country || 'N/A' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <EditTenantProfile v-model:visible="editDialog" :data="data" @saved="getProfileData" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { getRecordApi } from '@/api/endpoints';
import { TENANT_API_KEY } from '@/utils/storage/variables';
import { storage } from '@/utils/storage';
import { useEnv } from '@/hooks/useEnv';
import EditTenantProfile from './EditTenantProfile.vue';

const { imgUrl } = useEnv();
const editDialog = ref(false);
const data: Ref<any> = ref({});

const openEditDialog = () => {
  editDialog.value = true;
};

const getProfileData = async () => {
  const tenantApiKey = storage.getTenantApiKey(TENANT_API_KEY);
  const res: any = await getRecordApi(`/tenants/find-single-tenant-profile/${tenantApiKey}`);
  data.value = res.data;
};

const formatDate = (date: string) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

onMounted(() => {
  getProfileData();
});
</script>

<style lang="css" scoped>
@reference "../../../assets/css/main.css";
</style>
