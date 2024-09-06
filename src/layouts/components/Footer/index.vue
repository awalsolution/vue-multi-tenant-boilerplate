<template>
  <footer class="layout_footer bg_gr">
    <span>{{ appTitle }} - v{{ version }}</span>
    <span>©</span>
    <img
      class="-mb-2 cursor-pointer pb-2 transition-all hover:-translate-y-1 hover:scale-110 active:-translate-y-0 active:scale-105 active:opacity-75"
      src="@src/assets/images/bit_ocean.png"
      alt=""
      loading="eager"
      width="18"
      @click="openNewWindow(teamGitHubURL)"
    />
    <span>{{ teamName }}</span>
  </footer>
</template>

<script setup lang="ts">
import { useEnv } from '@src/hooks/useEnv';
import { BrowserUtils } from '@src/utils/browser';

const { appTitle, version, teamName, teamGitHubURL } = useEnv();

const { openNewWindow } = BrowserUtils;
</script>

<style lang="scss" scoped>
.layout_footer {
  @apply z-50 flex h-10 w-full items-center justify-center space-x-2 text-xs text-white px-8 md:px-0;
}

.bg_gr {
  @apply bg-secondary;
}
</style>
