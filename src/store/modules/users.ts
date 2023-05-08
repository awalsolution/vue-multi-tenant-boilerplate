import { defineStore } from 'pinia';
import { ResultEnum } from '@/enums/httpEnum';
import {
  getUsersApi,
  getUserApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from '@/api/user/user';

export type IUsersState = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  users: [];
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
    users: [],
  }),
  getters: {},
  actions: {
    setFirstName(name: any) {
      this.first_name = name;
    },
    setLastName(last_name: any) {
      this.last_name = last_name;
    },
    setUsers(users: any) {
      this.users = users;
    },
    async getUsers() {
      const response = await getUsersApi();
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setUsers(result);
      }
      return response;
    },
    async getUser(userId: number) {
      const response = await getUserApi(userId);
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setFirstName(result);
        this.setLastName(result);
      }
      return response;
    },
    async createUser(params: any) {
      const response = await createUserApi(params);
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setFirstName(result);
        this.setLastName(result);
      }
      return response;
    },
    async updateUser(userId: number, params: any) {
      const response = await updateUserApi(userId, params);
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setFirstName(result);
        this.setLastName(result);
      }
      return response;
    },
    async deleteUser(userId: number) {
      const response = await deleteUserApi(userId);
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setFirstName(result);
        this.setLastName(result);
      }
      return response;
    },
  },
});
