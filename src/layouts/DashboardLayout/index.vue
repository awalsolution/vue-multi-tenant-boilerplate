<template>
  <template v-if="loading">
    <GlobalLoading />
  </template>
  <template v-else>
    <main class="h-screen w-full overflow-hidden">
      <div class="flex h-full w-full">
        <Sidebar />
        <div class="relative h-full flex-1 overflow-y-auto overflow-x-hidden">
          <Header />
          <Tabs />
          <RouterView>
            <template #default="{ Component, route }">
              <Transition name="slide-fade" mode="out-in">
                <component
                  :is="Component"
                  :key="route.fullPath"
                  class="relative min-h-[calc(100%-144px)] w-full p-2 sm:p-4"
                />
              </Transition>
            </template>
          </RouterView>
          <Footer />
        </div>
      </div>
    </main>
  </template>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import GlobalLoading from '@src/components/GlobalLoading/index.vue';
import Sidebar from '@src/layouts/components/Sidebar/index.vue';
import Header from '@src/layouts/components/Header/index.vue';
import Tabs from '@src/layouts/components/Tabs/index.vue';
import Footer from '@src/layouts/components/Footer/index.vue';
import { useUsersStore } from '@src/store/modules/users';
import { AuthUtils } from '@src/utils/auth';
import { useMessage } from 'naive-ui';

const usersStore = useUsersStore();
const router = useRouter();
const message: any = useMessage();

const loading = ref(true);
const checkLogin = async () => {
  console.log('Token are in local storage ===>', AuthUtils.isAuthenticated());
  if (AuthUtils.isAuthenticated()) {
    if (!usersStore.getCurrentUser.id) {
      const res: any = (await usersStore.getUserInfo()) || {};
      message.success(res.message);
    }
    loading.value = false;
  } else {
    usersStore.clearCurrentUser();
    router.replace({
      path: '/login',
    });
    loading.value = false;
  }
  loading.value = false;
};

onBeforeMount(() => checkLogin());
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
