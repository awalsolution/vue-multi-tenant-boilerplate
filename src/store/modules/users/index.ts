import { getUserInfoApi, loginApi } from '@src/api/auth';
import { AuthUtils } from '@src/utils/auth';
import { defineStore } from 'pinia';
import _ from 'lodash';

export const useUsersStore = defineStore({
  id: 'app-user',
  state: (): any => ({
    token: AuthUtils.getToken(),
    currentUser: {},
    permissions: [],
    roles: [],
  }),
  getters: {
    hasData(): number {
      return this.currentUser.id;
    },
    getToken(): string {
      return this.token;
    },
    getPermissions(): any {
      return this.permissions;
    },
    getCurrentUser(): any {
      return this.currentUser;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setCurrentUser(info: any) {
      this.currentUser = info;
    },
    setPermissions(permissions: any) {
      this.permissions = permissions;
    },
    clearCurrentUser() {
      this.currentUser = {};
    },

    async login(params: any) {
      const response = await loginApi(params);
      const { result, code } = response;
      if (code === 200) {
        this.setToken(result.token);
        this.setCurrentUser(result.user);
      }
      return response;
    },

    async getUserInfo() {
      const res: any = await getUserInfoApi();
      if (res.result) {
        const permissionsList = this.allPermissions(res.result);
        this.setPermissions(permissionsList);
        this.setCurrentUser(res.result);
      } else {
        const permissionsList: any[] = [];
        this.setPermissions(permissionsList);
        this.setCurrentUser(res.result);
      }
      return res;
    },

    allPermissions(user: any) {
      let rolePermissions: string[] = [];
      if (user?.roles) {
        for (const role of user.roles) {
          rolePermissions = [
            ...role.permissions.map((permission: any) => permission.name),
          ];
        }
      }
      const userPermissions =
        user?.permissions.map((permission: any) => permission.name) || [];

      return _.uniq([...userPermissions, ...rolePermissions]);
    },

    async logout() {
      this.setPermissions([]);
      this.setCurrentUser({});
      AuthUtils.clearToken();
      return { message: 'User Logout Successfully' };
    },
  },
});
