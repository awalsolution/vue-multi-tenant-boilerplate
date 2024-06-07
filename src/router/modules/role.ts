import type { RouteRecordRaw } from 'vue-router';
import { PeopleLock20Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'role';

const routes: RouteRecordRaw[] = [
  {
    path: '/role',
    name: routeName,
    redirect: '/role/list',
    component: DashboardLayout,
    meta: {
      title: 'Role',
      icon: renderIcon(PeopleLock20Regular),
      permissions: ['role menu'],
      sort: 8
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Role List',
          permissions: ['role menu']
        },
        component: () => import('@src/views/role/index.vue')
      },
      {
        path: 'add',
        name: `${routeName}_add`,
        meta: {
          title: 'Add Role',
          permissions: ['role create']
        },
        component: () => import('@src/components/role/AddRole.vue')
      },
      {
        path: 'edit',
        name: `${routeName}_edit`,
        meta: {
          title: 'Edit Role',
          permissions: ['role update'],
          hidden: true,
          dismissTab: true
        },
        component: () => import('@src/components/role/EditRole.vue')
      },
      {
        path: 'assing-permission/:roleId',
        name: `${routeName}_assing_permission`,
        meta: {
          title: 'Assing Permission',
          permissions: ['assign permission'],
          hidden: true
        },
        component: () => import('@src/components/permission/AssignPermissions.vue')
      }
    ]
  }
];

export default routes;
