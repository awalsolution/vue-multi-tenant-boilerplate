import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function useRolefilter() {
  const roles: any = ref([]);
  const roleLoading = ref(false);
  const rolesInitialized = ref(false);

  async function findRole(query: any) {
    if (isEmpty(query)) {
      roles.value = [];
    } else {
      roleLoading.value = true;
      const response: any = await getRecordsApi('/role', {
        name: query
      });
      roles.value = response.data?.data;
      roleLoading.value = false;
    }
  }

  async function getRoles() {
    roleLoading.value = true;
    const response: any = await getRecordsApi('/role');
    roles.value = response.data?.data;
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
    getRolesOnFocus
  };
}
