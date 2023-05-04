<template>
  <NConfigProvider
    v-if="!isLock"
    :locale="enUS"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
    :date-locale="dateEnUS"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>

  <transition v-if="isLock && $route.name !== 'login'" name="slide-up">
    <LockScreen />
  </transition>
</template>

<script lang="ts" setup>
  import { computed, onMounted, onUnmounted } from 'vue';
  import { enUS, dateEnUS, darkTheme } from 'naive-ui';
  import { LockScreen } from '@/components/Lockscreen';
  import { AppProvider } from '@/components/Application';
  import { useScreenLockStore } from '@/store/modules/screenLock.js';
  import { useRoute } from 'vue-router';
  import { useDesignSettingStore } from '@/store/modules/designSetting';
  import { lighten } from '@/utils/index';

  const route = useRoute();
  const useScreenLock = useScreenLockStore();
  const designStore = useDesignSettingStore();
  const isLock = computed(() => useScreenLock.isLocked);
  const lockTime = computed(() => useScreenLock.lockTime);

  /**
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const getThemeOverrides = computed(() => {
    const appTheme = designStore.appTheme;
    const lightenStr = lighten(designStore.appTheme, 6);
    return {
      common: {
        primaryColor: appTheme,
        primaryColorHover: lightenStr,
        primaryColorPressed: lightenStr,
        primaryColorSuppl: appTheme,
      },
      LoadingBar: {
        colorLoading: appTheme,
      },
    };
  });

  const getDarkTheme = computed(() => (designStore.darkTheme ? darkTheme : undefined));

  let timer: NodeJS.Timer;

  const timekeeping = () => {
    clearInterval(timer);
    if (route.name == 'login' || isLock.value) return;
    // Set not to lock the screen
    useScreenLock.setLock(false);
    // reset lock screen time
    useScreenLock.setLockTime();
    timer = setInterval(() => {
      // Lock screen countdown countdown
      useScreenLock.setLockTime(lockTime.value - 1);
      if (lockTime.value <= 0) {
        // set lock screen
        useScreenLock.setLock(true);
        return clearInterval(timer);
      }
    }, 1000);
  };

  onMounted(() => {
    document.addEventListener('mousedown', timekeeping);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', timekeeping);
  });
</script>

<style lang="less">
  @import 'styles/index.less';
</style>
