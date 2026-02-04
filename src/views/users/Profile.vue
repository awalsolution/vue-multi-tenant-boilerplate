<template>
  <div class="p-6 mx-auto">
    <div class="flex flex-col md:flex-row gap-6">
      <div class="w-full md:w-1/3 flex flex-col gap-6">
        <div class="bg-surface-card p-6 rounded shadow-sm border border-surface-200">
          <div class="flex flex-col items-center text-center">
            <div class="relative mb-4">
              <Avatar
                :image="imgUrl + data?.profile_picture"
                shape="circle"
                size="xlarge"
                class="w-32 h-32 border-4 border-primary shadow-lg"
              />
            </div>
            <h1 class="text-2xl font-bold text-surface-900 mb-1">{{ data?.name }}</h1>
            <p class="text-surface-500 mb-4">{{ data?.email }}</p>
            <div class="flex flex-wrap justify-center gap-2 mb-6">
              <Tag v-for="role in data?.roles" :key="role.id" severity="primary">
                {{ role.name }}
              </Tag>
            </div>
            <Button
              label="Edit Profile"
              icon="pi pi-user-edit"
              variant="outlined"
              severity="success"
              @click="openEditDialog"
            />
          </div>
        </div>

        <div class="bg-surface-card p-6 rounded shadow-sm border border-surface-200">
          <h3 class="text-lg font-semibold text-surface-900 mb-4">Account Status</h3>
          <div class="flex items-center justify-between py-2 border-b border-surface-100">
            <span class="text-surface-600">Status</span>
            <Tag :severity="data?.status === 1 ? 'success' : 'warn'">
              {{ data?.status === 1 ? 'Active' : 'Inactive' }}
            </Tag>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-surface-600">Created At</span>
            <span class="text-surface-900 font-medium">{{ formatDate(data?.created_at) }}</span>
          </div>
        </div>
      </div>

      <div class="w-full md:w-2/3">
        <div class="bg-surface-card p-8 rounded shadow-sm border border-surface-200 h-full">
          <h2 class="text-xl font-bold text-surface-900 mb-6 pb-2 border-b border-surface-100">Profile Information</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-1">
              <label class="text-sm font-semibold text-surface-500 uppercase tracking-wider">Full Name</label>
              <p class="text-lg text-surface-900">{{ data?.name || 'N/A' }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-semibold text-surface-500 uppercase tracking-wider">Email Address</label>
              <p class="text-lg text-surface-900">{{ data?.email || 'N/A' }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-semibold text-surface-500 uppercase tracking-wider">Phone Number</label>
              <p class="text-lg text-surface-900">{{ data?.phone_number || 'N/A' }}</p>
            </div>
            <div class="space-y-1">
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

    <EditProfile v-model:visible="editDialog" :data="data" @saved="getProfileDataFromStore" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { useEnv } from '@/hooks/useEnv';
import EditProfile from './components/EditProfile.vue';

const { imgUrl } = useEnv();
const userStore = useUserStore();
const editDialog = ref(false);
const data: Ref<any> = ref({});

const openEditDialog = () => {
  editDialog.value = true;
};

const getProfileDataFromStore = () => {
  data.value = userStore.currentUser;
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
  getProfileDataFromStore();
});
</script>

<style lang="css" scoped></style>
