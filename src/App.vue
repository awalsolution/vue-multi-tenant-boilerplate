<template>
  <Toast
    :pt="{
      messageContent: () => ({
        class: ['bg-green-500/20']
      })
    }"
  />
  <router-view />
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

window.toast = (
  type: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast',
  summary: string,
  message: string
) => {
  toast.add({
    severity: type,
    summary: summary,
    detail: message,
    life: 3000
  });
};
</script>

<style lang="scss" scoped></style>
