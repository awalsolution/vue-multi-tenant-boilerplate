<template>
  <Dialog :visible="visible" @update:visible="emit('update:visible', $event)" class="w-1/3" header="Confirm" :modal="true">
    <div class="flex items-center gap-4">
      <i class="pi pi-exclamation-triangle text-3xl" />
      <span v-if="permissionName">
        Are you sure you want to delete <b>{{ permissionName }}</b>?
      </span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" text @click="handleCancel" />
      <Button label="Yes" icon="pi pi-check" severity="danger" @click="handleConfirm" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { Dialog, Button } from 'primevue';
import { deleteRecordApi } from '@/api/endpoints';

interface Props {
  visible: boolean;
  permissionId?: number;
  permissionName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
});

const emit = defineEmits<{
  'update:visible': [value: boolean];
  deleted: [];
}>();

const handleCancel = () => {
  emit('update:visible', false);
};

const handleConfirm = () => {
  if (props.permissionId) {
    deleteRecordApi(`/permissions/${props.permissionId}`)
      .then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        emit('deleted');
        emit('update:visible', false);
      })
      .catch((res) => {
        window.toast('error', 'Error Message', res.message);
      });
  }
};
</script>

<style scoped></style>
