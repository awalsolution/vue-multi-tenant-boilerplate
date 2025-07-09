<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { ACCESS_TOKEN } from '@/utils/storage/variables';
import { storage } from '@/utils/storage';

const usersStore = useUserStore();
const router = useRouter();

const checkLogin = () => {
  if (storage.isAuthenticated(ACCESS_TOKEN)) {
    router.replace('/');
  } else {
    console.log('check login on authlayout component');
    usersStore.logout();
  }
};

onBeforeMount(() => checkLogin());
</script>
