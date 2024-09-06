<template>
  <main class="main_container">
    <div class="container_inner intro-y">
      <div class="container_inner_left -intro-x">
        <h2 class="text-4xl font-bold text-white mb-4 uppercase">Welcome Back</h2>
        <h3 class="text-2xl text-white mb-4 font-bold">{{ appTitle }}</h3>
        <h3 class="text-sm text-gray-200 mb-2">v{{ version }}</h3>
      </div>
      <div class="container_inner_right">
        <RouterView v-slot="{ Component }">
          <component :is="Component" />
        </RouterView>
      </div>
      <!-- <ThemeSwitchDevTool /> -->
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useEnv } from '@src/hooks/useEnv';
import { useUserStore } from '@src/store/modules/user';
// import ThemeSwitchDevTool from '@src/components/common/ThemeSwitchDevTool/index.vue';
import { ACCESS_TOKEN } from '@src/utils/storage/variables';
import { storage } from '@src/utils/storage';

const { version, appTitle } = useEnv();

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

<style scoped lang="scss">
.main_container {
  @apply flex items-center justify-center min-h-screen bg-gradient-to-t from-primary to-secondary;
}
.container_inner {
  @apply bg-light rounded-2xl shadow-lg max-w-4xl grid grid-cols-1 md:grid-cols-2 py-8 md:py-3;
}
.container_inner_left {
  @apply flex flex-col justify-center p-10 bg-gradient-to-t from-primary to-secondary rounded-r-full text-center;
}
.container_inner_right {
  @apply flex flex-col justify-center p-10;
}
</style>
