import { RouteRecordRaw } from 'vue-router';
import { SettingsOutline } from '@vicons/ionicons5';
import { DashboardLayout } from '@src/router/constant';
// import { renderIcon } from '@src/utils/render';

const routeName = 'system';

export const routes: RouteRecordRaw = {
  path: '/system',
  name: routeName,
  redirect: '/system/users',
  component: DashboardLayout,
  meta: {
    title: 'System Settings',
    permissions: ['can view system setting'],
    icon: SettingsOutline,
    sort: 1,
  },
  children: [
    {
      path: 'users',
      name: `${routeName}_users`,
      meta: {
        title: 'Users',
        permissions: ['can view users'],
      },
      component: () => import('@src/views/users/index.vue'),
    },
    {
      path: 'profile',
      name: `${routeName}_profile`,
      meta: {
        title: 'Profile',
        permissions: ['can view profile'],
        hidden: true,
      },
      component: () => import('@src/views/users/Profile.vue'),
    },
    {
      path: 'role',
      name: `${routeName}_role`,
      meta: {
        title: 'Roles',
        permissions: ['can view roles'],
      },
      component: () => import('@src/views/roles/index.vue'),
    },
    {
      path: 'permissions',
      name: `${routeName}_permission`,
      meta: {
        title: 'Permissions',
        permissions: ['can view permissions'],
      },
      component: () => import('@src/views/permissions/index.vue'),
    },
  ],
};
