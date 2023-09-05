import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref<any>({});
  const currentUser = ref<any>({});
  const permissions: any = ref([]);

  const hasData = () => user.value.id;

  const setUser = (data: any) => {
    user.value = { ...user.value, ...data };
    let rolePermissions: string[] = [];
    if (data?.roles) {
      for (const role of data.roles) {
        rolePermissions = [
          ...role.permissions.map((permission: any) => permission.name),
        ];
      }
    }
    const userPermissions =
      data?.permissions.map((permission: any) => permission.name) || [];
    permissions.value = [...userPermissions, ...rolePermissions];
  };

  const setCurrentUser = (data: any) => {
    currentUser.value = { ...currentUser.value, ...data };
    let rolePermissions: string[] = [];
    if (data?.roles) {
      for (const role of data.roles) {
        rolePermissions = [
          ...role.permissions.map((permission: any) => permission.name),
        ];
      }
    }
    const userPermissions =
      data?.permissions.map((permission: any) => permission.name) || [];
    permissions.value = [...userPermissions, ...rolePermissions];
  };

  const clearUser = () => {
    user.value = {};
  };

  const clearCurrentUser = () => {
    currentUser.value = {};
  };

  return {
    currentUser,
    setCurrentUser,
    clearCurrentUser,
    permissions,
    user,
    hasData,
    setUser,
    clearUser,
  };
});
