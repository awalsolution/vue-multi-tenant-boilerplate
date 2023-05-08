import { defineStore } from 'pinia';
import { ResultEnum } from '@/enums/httpEnum';
import {
  getPermissionsApi,
  getPermissionApi,
  createPermissionApi,
  updatePermissionApi,
  deletePermissionApi,
} from '@/api/permission/permission';

export type IPermissionState = {
  permissions: [];
  name: string;
  description: string;
};

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): IPermissionState => ({
    permissions: [],
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
    setPermissions(permissions: any) {
      this.permissions = permissions;
    },
    async getPermissions() {
      const response = await getPermissionsApi();
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setPermissions(result);
      }
      return response;
    },
    async getPermission(permissionId: number) {
      const response = await getPermissionApi(permissionId);
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setName(result);
        this.setDescription(result);
      }
      return response;
    },
    async createPermission(params: any) {
      const response = await createPermissionApi(params);
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setName(result);
        this.setDescription(result);
      }
      return response;
    },
    async updatePermission(permissionId: number, params: any) {
      const response = await updatePermissionApi(permissionId, params);
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setName(result);
        this.setDescription(result);
      }
      return response;
    },
    async deletePermission(permissionId: number) {
      const response = await deletePermissionApi(permissionId);
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        this.setName(result);
        this.setDescription(result);
      }
      return response;
    },
  },
});
