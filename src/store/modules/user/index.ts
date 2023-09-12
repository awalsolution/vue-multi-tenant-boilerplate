import { ref } from 'vue';
import { defineStore } from 'pinia';
import { AuthUtils } from '@src/utils/auth';

export const useUserStore = defineStore('app-user', () => {
  const currentUser = ref<any>({});
  const permissions: any = ref([]);

  const hasData = () => currentUser.value.id;

  const setCurrentUser = (data: any) => {
    currentUser.value = { ...currentUser.value, ...data };
    let RP: string[] = [];
    if (data?.roles) {
      for (const role of data.roles) {
        RP = [...role.permissions.map((p: any) => p.name)];
      }
    }
    const UP = data?.permissions.map((p: any) => p.name) || [];
    permissions.value = [...UP, ...RP];
  };

  const clearCurrentUser = () => {
    currentUser.value = {};
    permissions.value = [];
  };

  const logout = () => {
    currentUser.value = {};
    permissions.value = [];
    AuthUtils.clearToken();
    return { message: 'User logout Successfully!' };
  };

  return {
    hasData,
    permissions,
    currentUser,
    setCurrentUser,
    clearCurrentUser,
    logout,
  };
});
