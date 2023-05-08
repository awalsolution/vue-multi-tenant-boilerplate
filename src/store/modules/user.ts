import { defineStore } from 'pinia';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER, IS_SCREENLOCKED } from '@/store/mutation-types';
import { ResultEnum } from '@/enums/httpEnum';
import { getUserInfo as getUserInfoApi, login } from '@/api/auth/auth';
import { storage } from '@/utils/Storage';
import _ from 'lodash';

export type UserInfoType = {
  // TODO: add your own data
  name: string;
  email: string;
  user_type: string;
};

export interface IUserState {
  token: string;
  email: string;
  welcome: string;
  avatar: string;
  permissions: any[];
  info: UserInfoType;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: storage.get(ACCESS_TOKEN, ''),
    email: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getNickname(): string {
      return this.email;
    },
    getPermissions(): [any][] {
      return this.permissions;
    },
    getUserInfo(): UserInfoType {
      return this.info;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setPermissions(permissions: any) {
      this.permissions = permissions;
    },
    setUserInfo(info: UserInfoType) {
      this.info = info;
    },
    // Log in
    async login(params: any) {
      const response = await login(params);
      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        const ex = 7 * 24 * 60 * 60;
        storage.set(ACCESS_TOKEN, result.token, ex);
        storage.set(CURRENT_USER, result, ex);
        storage.set(IS_SCREENLOCKED, false);
        this.setToken(result.token);
        this.setUserInfo(result);
      }
      return response;
    },

    // Get user information
    async getInfo() {
      const result = await getUserInfoApi();
      if (result.permissions && result.permissions.length) {
        const permissionsList = this.allPermissions(result);
        this.setPermissions(permissionsList);
        this.setUserInfo(result);
      } else {
        throw new Error('getInfo: permissionsList must be a non-null array !');
      }
      this.setAvatar(result.avatar);
      return result;
    },

    allPermissions(user: any) {
      let rolePermissions: string[] = [];
      console.log(user);
      if (user?.roles) {
        for (const role of user.roles) {
          rolePermissions = [...role.permissions.map((permission: any) => permission.name)];
        }
      }
      const userPermissions = user?.permissions.map((permission: any) => permission.name) || [];

      return _.uniq([...userPermissions, ...rolePermissions]);
    },
    // Sign out
    async logout() {
      this.setPermissions([]);
      this.setUserInfo({ name: '', email: '', user_type: '' });
      storage.remove(ACCESS_TOKEN);
      storage.remove(CURRENT_USER);
    },
  },
});

// Need to be used outside the setup
export function useUser() {
  return useUserStore(store);
}
