import type { RouteRecordRaw } from 'vue-router';
import { SettingsOutline } from '@vicons/ionicons5';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'system';

const routes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: routeName,
    redirect: '/system/users',
    component: DashboardLayout,
    meta: {
      title: 'System Settings',
      permissions: ['can view system setting menu'],
      icon: renderIcon(SettingsOutline),
      sort: 10
    },
    children: [
      {
        path: 'user',
        name: `${routeName}_users`,
        meta: {
          title: 'User List',
          permissions: ['can view user menu']
        },
        component: () => import('@src/views/users/index.vue')
      },
      {
        path: 'profile',
        name: `${routeName}_profile`,
        meta: {
          title: 'Profile',
          permissions: ['can view user profile'],
          hidden: true
        },
        component: () => import('@src/views/users/Profile.vue')
      },
      {
        path: 'company',
        name: `${routeName}_company`,
        meta: {
          title: 'Company',
          permissions: ['can view company profile'],
          hidden: true
        },
        component: () => import('@src/views/users/UserCompany.vue')
      },
      {
        path: 'assing-permission',
        name: `${routeName}_assing_permission`,
        meta: {
          title: 'Assing Permission',
          permissions: ['can view assign permission'],
          hidden: true
        },
        component: () => import('@src/components/permission/AssignPermissions.vue')
      },
      {
        path: 'role',
        name: `${routeName}_role`,
        meta: {
          title: 'Role List',
          permissions: ['can view role menu']
        },
        component: () => import('@src/views/roles/index.vue')
      },
      {
        path: 'permission',
        name: `${routeName}_permission`,
        meta: {
          title: 'Permission List',
          permissions: ['can view permission menu']
        },
        component: () => import('@src/views/permissions/index.vue')
      },
      {
        path: 'menus',
        name: `${routeName}_menu`,
        meta: {
          title: 'Menus',
          permissions: ['can view menu menu']
        },
        component: () => import('@src/views/menu/index.vue')
      }
    ]
  }
];

export default routes;
