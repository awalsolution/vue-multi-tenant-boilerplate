import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@src/types/user';

export const useUserStore = defineStore('user', () => {
  const user = ref<any>({});
  const currentUser = ref<any>({});
  const permissions = ref<any>([]);

  const hasData = () => user.value.id;

  const setUser = (data: User) => {
    user.value = { ...user.value, ...data };
  };

  const setCurrentUser = (data: User) => {
    currentUser.value = { ...currentUser.value, ...data };
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
    user,
    permissions,
    hasData,
    setUser,
    clearUser,
  };
});
