<template>
  <main class="flex h-screen flex-col items-center justify-center">
    <n-spin size="large">
      <template #icon>
        <n-icon>
          <ArrowSync20Regular class="text-red-600" />
        </n-icon>
      </template>
      <template #description>
        <n-gradient-text
          gradient="linear-gradient(90deg, red 0%, #004B85 50%, #0081E6 100%)"
          class="text-lg"
        >
          Awal Solution
        </n-gradient-text>
      </template>
    </n-spin>
  </main>
</template>
<script lang="ts" setup>
import { ArrowSync20Regular } from '@vicons/fluent';
</script>
