<template>
  <div
    class="bg-default-light dark:bg-default-dark absolute inset-y-0 left-0 z-[100] h-full border-r border-gray-300 shadow-sm transition-[width] dark:border-gray-800 sm:static"
    :class="[
      sidebarStore.isDisplay
        ? sidebarStore.isCollapse
          ? 'w-16'
          : 'w-56'
        : 'w-0',
    ]"
  >
    <!-- Header -->
    <div
      class="flex h-14 w-full select-none items-center justify-center"
      @click="router.push('/')"
    >
      <img
        class="animate-pulse cursor-pointer select-none"
        width="36"
        height="36"
        src="@src/assets/images/favicon.png"
        alt=""
        loading="eager"
      />
      <span
        class="cursor-pointer whitespace-nowrap text-sm tracking-wide transition-all"
        :class="[
          sidebarStore.isDisplay
            ? sidebarStore.isCollapse
              ? 'ml-0 hidden'
              : 'ml-3 w-auto'
            : 'hidden',
        ]"
      >
        {{ appTitle }}
      </span>
    </div>

    <div class="h-[calc(100%-96px)]">
      <NScrollbar :size="10">
        <NMenu
          ref="menuInstRef"
          :collapsed-icon-size="20"
          :collapsed="sidebarStore.isCollapse"
          :value="defaultPath"
          :options="menuOptions"
          :default-value="defaultPath"
          :expanded-keys="defaultExpandKeys"
          :collapsed-width="64"
          :root-indent="18"
          :indent="26"
          accordion
          @update:value="onMenuClick"
          @update:expanded-keys="onMenuExpandedKeysClick"
        />
      </NScrollbar>
    </div>

    <div v-if="sidebarStore.isDisplay" class="h-10 w-full p-1">
      <div
        class="hover-container flex h-full w-full cursor-pointer items-center justify-center rounded-sm transition-all"
        @click="() => sidebarStore.toggleSidebarCollapse()"
      >
        <NTooltip placement="bottom" trigger="hover">
          <template #trigger>
            <NIcon
              size="18"
              class="icon-animation transition-all"
              :class="[sidebarStore.isCollapse ? '!rotate-180' : '!rotate-0']"
              :component="MenuFoldOutlined"
            />
          </template>
          {{ sidebarStore.isCollapse ? 'Show' : 'Collapse' }}
        </NTooltip>
      </div>
    </div>
  </div>

  <div
    class="absolute inset-0 z-[75] bg-black opacity-40 sm:hidden"
    :class="sidebarStore.isDisplay ? 'block' : 'hidden'"
    @click="sidebarStore.toggleSidebarDisplay()"
  ></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, shallowReactive } from 'vue';
import { MenuFoldOutlined } from '@vicons/antd';
import { MenuInst, MenuOption } from 'naive-ui';
import { useRoute, useRouter, RouteRecordNormalized } from 'vue-router';
import { useSidebarStore } from '@src/store/modules/sidebar';
import { useEnv } from '@src/hooks/useEnv';
import { usePermission } from '@src/utils/permission/usePermission';
import { isExternal } from '@src/utils/common/is';
import { asyncRoutes } from '@src/router';
import { transfromMenu } from '@src/utils/router/transformMenu';

const router = useRouter();
const { appTitle } = useEnv();
const { hasPermission } = usePermission();
const sidebarStore = useSidebarStore();
const menuInstRef = ref<MenuInst | null>(null);
const menuOptions = shallowReactive([] as Array<MenuOption>);
const defaultPath = ref('');
const defaultExpandKeys = ref<Array<string>>([]);
const currentRoute = useRoute();
defaultPath.value = currentRoute.fullPath;
handleExpandPath();

function handleMenu(routes?: Array<RouteRecordNormalized>) {
  menuOptions.length = 0;
  const tempMenus = transfromMenu(routes || []);
  menuOptions.push(...tempMenus);
}

function handleExpandPath() {
  const keys = defaultPath.value.split('/');
  const results = keys
    .filter((it) => !!it)
    .reduce((pre, cur) => {
      const lastItem = pre[pre.length - 1];
      if (!lastItem) {
        pre.push('/' + cur);
      } else {
        pre.push(lastItem + '/' + cur);
      }
      return pre;
    }, [] as string[]);
  defaultExpandKeys.value = Array.from(
    new Set([...defaultExpandKeys.value, ...results])
  );
}
function onMenuClick(key: string, item: any) {
  if (isExternal(key)) return;
  router.push({ name: item.name });
}
function onMenuExpandedKeysClick(keys: string[]) {
  defaultExpandKeys.value = keys;
}
watch(
  () => currentRoute.fullPath,
  (newVal) => {
    defaultPath.value = newVal;
    handleExpandPath();
  }
);

onMounted(() => {
  handleMenu(asyncRoutes);
});
</script>

<style scoped lang="scss">
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
