import { defineStore } from 'pinia';

export type IPermissionState = {
  name: string;
  description: string;
};

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): IPermissionState => ({
    name: '',
    description: '',
  }),
  getters: {},
  actions: {
    getPermissions() {},
    getPermission() {},
    createPermission() {},
    updatePermission() {},
    deletePermission() {},
  },
});
