import { defineStore } from 'pinia';

export type IUsersState = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export const useUsersStore = defineStore({
  id: 'app-users',
  state: (): IUsersState => ({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  }),
  getters: {},
  actions: {
    getUsers() {},
    createUser() {},
    updateUser() {},
    deleteUser() {},
  },
});
