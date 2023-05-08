import { defineStore } from 'pinia';
import { ResultEnum } from '@/enums/httpEnum';
import {
  getRolesApi,
  getRoleApi,
  createRoleApi,
  updateRoleApi,
  deleteRoleApi,
} from '@/api/role/role';

export type IRoleState = {
  roles: [];
  name: string;
  description: string;
};

export const useRoleStore = defineStore({
  id: 'app-role',
  state: (): IRoleState => ({
    roles: [],
    name: '',
    description: '',
  }),
  getters: {},
  actions: {
    setName(name: any) {
      this.name = name;
    },
    setDescription(des: any) {
      this.description = des;
    },
    setRoles(roles: any) {
      this.roles = roles;
    },
    async getRoles() {
      const response = await getRolesApi();
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setRoles(result);
      }
      return response;
    },
    async getRole(roleId: number) {
      const response = await getRoleApi(roleId);
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setName(result);
        this.setDescription(result);
      }
      return response;
    },
    async createRole(params: any) {
      const response = await createRoleApi(params);
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setName(result);
        this.setDescription(result);
      }
      return response;
    },
    async updateRole(roleId: number, params: any) {
      const response = await updateRoleApi(roleId, params);
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setName(result);
        this.setDescription(result);
      }
      return response;
    },
    async deleteRole(roleId: number) {
      const response = await deleteRoleApi(roleId);
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setName(result);
        this.setDescription(result);
      }
      return response;
    },
  },
});
