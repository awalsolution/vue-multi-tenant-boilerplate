import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ACCESS_TOKEN, CURRENT_USER } from '@src/utils/storage/variables';
import { storage } from '@src/utils/storage';
import { loginApi, getCurrentUserApi } from '@src/api/auth';
import _ from 'lodash';

export const useUserStore = defineStore('app-user', () => {
  const token = ref(storage.get(ACCESS_TOKEN, ''));
  const permissions = ref([]);
  const roles = ref([]);
  const currentUser = ref(storage.get(CURRENT_USER, {}));

  const hasData = () => currentUser.value.id;

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const setPermissions = (newPermissions: any) => {
    permissions.value = newPermissions;
  };

  const setRoles = (newRole: any) => {
    roles.value = newRole;
  };

  const setCurrentUser = (newInfo: any) => {
    currentUser.value = newInfo;
  };

  const login = async (params: any) => {
    const res: any = await loginApi(params);
    const { token, code } = res;
    if (code === 200) {
      const ex = 7 * 24 * 60 * 60;
      storage.set(ACCESS_TOKEN, token, ex);
      // storage.set(CURRENT_USER, result.user, ex);
      setToken(token);
      // setCurrentUser(result.user);
    }

    return res;
  };

  const getCurrentUser = async () => {
    const res: any = await getCurrentUserApi();
    console.log('getCurrentUser ==>', res);
    const { code, data } = res;
    if (code === 200) {
      const permissionsList = await allPermissions(data);
      setPermissions(permissionsList);
      setRoles(data.roles);
      setCurrentUser(data);
    } else {
      throw new Error('api not responding correctly!');
    }

    return data;
  };

  const allPermissions = async (user: any) => {
    let rolePermissions: any = [];

    if (user?.roles) {
      for (const role of user.roles) {
        rolePermissions = [...role.permissions.map((permission: any) => permission.name)];
      }
    }

    const userPermissions = user?.permissions.map((permission: any) => permission.name) || [];

    return _.uniq([...userPermissions, ...rolePermissions]);
  };

  const logout = async () => {
    setPermissions([]);
    setRoles([]);
    setCurrentUser({});
    storage.remove(ACCESS_TOKEN);
    storage.remove(CURRENT_USER);
    return { message: 'User Logout Successfully!' };
  };

  return {
    token,
    permissions,
    roles,
    hasData,
    currentUser,
    login,
    logout,
    getCurrentUser
  };
});
