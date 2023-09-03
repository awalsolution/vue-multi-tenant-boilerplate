import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function filterPermission() {
  const permissions: any = ref([]);
  const permissionLoading = ref(false);
  const permissionsInitialized = ref(false);

  async function findPermission(query: any) {
    if (isEmpty(query)) {
      permissions.value = [];
    } else {
      permissionLoading.value = true;
      const response = await getRecordsApi('/permissions', { name: query, pageSize: 1000 });
      permissions.value = response.result;
      permissionLoading.value = false;
    }
  }

  async function getPermissions() {
    permissionLoading.value = true;
    const response = await getRecordsApi('/permissions');
    permissions.value = response.result;
    permissionLoading.value = false;
  }

  async function getPermissionsOnFocus() {
    if (!permissionsInitialized.value) {
      await getPermissions();
      permissionsInitialized.value = true;
    }
  }

  return {
    permissions,
    permissionLoading,
    permissionsInitialized,
    findPermission,
    getPermissions,
    getPermissionsOnFocus,
  };
}
