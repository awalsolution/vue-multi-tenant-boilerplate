<template>
  <div class="display-content">
    <!-- <NThemeEditor> -->
    <NConfigProvider :theme="themeStore.theme" :theme-overrides="themeStore.themeOverrides">
      <NLoadingBarProvider>
        <NDialogProvider>
          <NNotificationProvider>
            <NMessageProvider>
              <RouterView v-slot="{ Component }">
                <template v-if="Component">
                  <Transition name="router" mode="out-in">
                    <component :is="Component" />
                  </Transition>
                </template>
              </RouterView>
            </NMessageProvider>
          </NNotificationProvider>
        </NDialogProvider>
      </NLoadingBarProvider>
    </NConfigProvider>
    <!-- </NThemeEditor> -->
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@src/store/modules/theme';
// import { NThemeEditor } from 'naive-ui';

const themeStore = useThemeStore();
</script>

<style scoped lang="scss">
.router-enter-active,
.router-leave-active {
  transition: opacity 0.3s ease;
}
.router-enter-from,
.router-leave-to {
  opacity: 0;
}

@media print {
  .display-content {
    display: none;
  }
}
</style>
