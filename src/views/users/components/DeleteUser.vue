<template>
  <Dialog
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
    class="w-1/3"
    header="Confirm"
    :modal="true"
  >
    <div class="flex items-center gap-4">
      <i class="pi pi-exclamation-triangle text-3xl" />
      <span v-if="userEmail">
        Are you sure you want to delete <b>{{ userEmail }}</b>
        ?
      </span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" variant="outlined" severity="danger" @click="handleCancel" />
      <Button label="Yes" icon="pi pi-save" variant="outlined" severity="success" @click="handleConfirm" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { deleteRecordApi } from '@/api/endpoints';

interface Props {
  visible: boolean;
  userId?: number;
  userEmail?: string;
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
  if (props.userId) {
    deleteRecordApi(`/users/${props.userId}`)
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
