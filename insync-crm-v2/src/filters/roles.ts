import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function filterRole() {
  const roles: any = ref([]);
  const roleLoading = ref(false);
  const rolesInitialized = ref(false);

  async function findRole(query: any) {
    if (isEmpty(query)) {
      roles.value = [];
    } else {
      roleLoading.value = true;
      const response: any = await getRecordsApi('/roles', { name: query, pageSize: 1000 });
      roles.value = response.result.data;
      roleLoading.value = false;
    }
  }

  async function getRoles() {
    roleLoading.value = true;
    const response: any = await getRecordsApi('/roles');
    roles.value = response.result.data;
    roleLoading.value = false;
  }

  async function getRolesOnFocus() {
    if (!rolesInitialized.value) {
      await getRoles();
      rolesInitialized.value = true;
    }
  }

  return {
    roles,
    roleLoading,
    rolesInitialized,
    findRole,
    getRoles,
    getRolesOnFocus,
  };
}
