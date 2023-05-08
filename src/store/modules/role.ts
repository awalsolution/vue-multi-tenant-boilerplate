import { defineStore } from 'pinia';

export type IRoleState = {
  name: string;
  description: string;
};

export const useRoleStore = defineStore({
  id: 'app-role',
  state: (): IRoleState => ({
    name: '',
    description: '',
  }),
  getters: {},
  actions: {
    getRoles() {},
    getRole() {},
    createRole() {},
    updateRole() {},
    deleteRole() {},
  },
});
