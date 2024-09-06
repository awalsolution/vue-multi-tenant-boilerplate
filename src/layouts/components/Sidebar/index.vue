<template>
  <div
    class="sidebar_container"
    :class="[store.isDisplay ? (store.isCollapse ? 'w-16' : 'w-56') : 'w-0']"
  >
    <!-- Header -->
    <div class="sidebar_header" @click="router.push('/')">
      <img
        class="animate-pulse cursor-pointer select-none"
        width="36"
        height="36"
        src="@src/assets/images/bit_ocean.png"
        alt=""
        loading="eager"
      />
      <span
        class="sidebar_logo"
        :class="[store.isDisplay ? (store.isCollapse ? 'ml-0 hidden' : 'ml-3 w-auto') : 'hidden']"
      >
        {{ appTitle }}
      </span>
    </div>

    <div class="h-[calc(100%-96px)]">
      <NScrollbar :size="10">
        <SideBarItems />
      </NScrollbar>
    </div>

    <div v-if="store.isDisplay" class="h-10 w-full p-1 text-white">
      <div class="hover-container" @click="() => store.toggleSidebarCollapse()">
        <NTooltip placement="bottom" trigger="hover">
          <template #trigger>
            <NIcon
              size="18"
              class="icon-animation transition-all"
              :class="[store.isCollapse ? '!rotate-180' : '!rotate-0']"
              :component="MenuFoldOutlined"
            />
          </template>
          {{ store.isCollapse ? 'Show' : 'Collapse' }}
        </NTooltip>
      </div>
    </div>
  </div>

  <div
    class="absolute inset-0 z-[75] bg-black opacity-40 sm:hidden"
    :class="store.isDisplay ? 'block' : 'hidden'"
    @click="store.toggleSidebarDisplay()"
  ></div>
</template>

<script setup lang="ts">
import { MenuFoldOutlined } from '@vicons/antd';
import { useRouter } from 'vue-router';
import { useSidebarStore } from '@src/store/modules/sidebar';
import { SideBarItems } from '@src/layouts/components/menu';
import { useEnv } from '@src/hooks/useEnv';

const router = useRouter();
const { appTitle } = useEnv();
const store = useSidebarStore();
</script>

<style scoped lang="scss">
.sidebar_container {
  @apply absolute inset-y-0 left-0 z-[100] transition-[width] sm:static;
}
.sidebar_header {
  @apply flex h-14 w-full select-none items-center justify-center flex-wrap;
}
.sidebar_logo {
  @apply cursor-pointer whitespace-nowrap text-sm tracking-wide transition-all text-white;
}

.hover-container {
  @apply flex size-full cursor-pointer items-center justify-center rounded-sm transition-all;
}
.icon-animation {
  transition: all 0.3s ease-in-out;
}

.hover-container:hover .icon-animation {
  transform: scale(1.2);
  opacity: 0.9;
}

.hover-container:active .icon-animation {
  transform: scale(1);
  opacity: 0.75;
}
</style>
