<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <router-link to="/" class="layout-topbar-logo">
        <img src="../../assets/images/logo/main-logo-awal.png" alt="" srcset="" />
        <!-- <span>Awal Solution</span> -->
      </router-link>
      <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
        <i class="pi pi-bars"></i>
      </button>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
        </button>
        <div class="relative">
          <button
            v-styleclass="{
              selector: '@next',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-scalein',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-fadeout',
              hideOnOutsideClick: true,
            }"
            type="button"
            class="layout-topbar-action"
          >
            <i class="pi pi-palette"></i>
          </button>
          <AppConfigurator />
        </div>
      </div>

      <!-- <button
        class="layout-topbar-menu-button layout-topbar-action"
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-fadeout',
          hideOnOutsideClick: true
        }"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button> -->

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <!-- <button type="button" class="layout-topbar-action">
            <i class="pi pi-calendar"></i>
            <span>Calendar</span>
          </button>
          <button type="button" class="layout-topbar-action">
            <i class="pi pi-inbox"></i>
            <span>Messages</span>
          </button> -->
          <button
            type="button"
            class="layout-topbar-action"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          >
            <Avatar
              v-if="userStore.currentUser?.profile_picture"
              :image="`${imgUrl}${userStore.currentUser?.profile_picture}`"
              class="mr-2"
              shape="circle"
            />
            <i v-if="!userStore.currentUser?.profile_picture" class="pi pi-user"></i>
          </button>
          <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
            <template #start>
              <span class="inline-flex items-center gap-1 px-2 py-2">
                <svg
                  width="35"
                  height="40"
                  viewBox="0 0 35 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8"
                >
                  <path
                    d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                    fill="var(--p-primary-color)"
                  />
                  <path
                    d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                    fill="var(--p-text-color)"
                  />
                </svg>
                <span class="text-xl font-semibold">Account<span class="text-primary"> Setting</span></span>
              </span>
            </template>
            <template #item="{ item, props }">
              <button v-bind="props.action" @click="item.key && selectUserOption(item.key as UserOptionKey)">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </button>
            </template>
            <template #end>
              <button
                class="relative overflow-hidden w-full border-0 bg-transparent flex items-center p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200"
              >
                <Avatar
                  v-if="userStore.currentUser?.profile_picture"
                  :image="`${imgUrl}${userStore.currentUser?.profile_picture}`"
                  class="mr-2"
                  shape="circle"
                />
                <span class="inline-flex flex-col items-start">
                  <span class="font-bold">{{ userStore.currentUser?.name }}</span>
                  <span class="text-sm">{{ userStore.currentUser?.email }}</span>
                </span>
              </button>
            </template>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import { useLayout } from '@/layouts/components/composables/layout';
import { useUserStore } from '@/store/modules/user';
import { useEnv } from '@/hooks/useEnv';
import AppConfigurator from './AppConfigurator.vue';

const { imgUrl } = useEnv();
const userStore = useUserStore();
const router = useRouter();
const menu: Ref = ref();
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

const toggle = (event: Event) => {
  menu.value.toggle(event);
};

const logout = async () => {
  return await router
    .replace('/login')
    .then(async () => {
      const res = await userStore.logout();
      window.toast('success', 'Success Message', res.message);
    })
    .finally(() => location.reload());
};

type UserOptionKey = 'logout' | 'user_profile' | 'change_password' | 'tenant_profile';

const selectUserOption = (key: UserOptionKey) => {
  switch (key) {
    case 'logout':
      logout();
      break;
    case 'user_profile':
      router.push({ name: 'user_profile' });
      break;
    case 'tenant_profile':
      router.push({ name: 'tenant_profile' });
      break;
    case 'change_password':
      router.push('/change-password');
      break;
    default:
      break;
  }
};

const items = ref([
  {
    separator: true,
  },
  {
    label: 'Setting',
    items: [
      {
        label: 'User Profile',
        key: 'user_profile',
        icon: 'pi pi-user-edit',
      },
      {
        label: 'Organization Profile',
        key: 'tenant_profile',
        icon: 'pi pi-check-circle',
      },
      {
        label: 'Change Password',
        key: 'change-password',
        icon: 'pi pi-lock',
      },
      {
        label: 'Logout',
        key: 'logout',
        icon: 'pi pi-sign-out',
      },
    ],
  },
  {
    separator: true,
  },
]);
</script>
