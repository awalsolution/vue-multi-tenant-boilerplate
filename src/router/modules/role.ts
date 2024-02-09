import type { RouteRecordRaw } from 'vue-router';
import { PersonLock20Regular } from '@vicons/fluent';
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
      icon: renderIcon(PersonLock20Regular),
      permissions: ['view role menu'],
      sort: 3
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Role List',
          permissions: ['view role menu']
        },
        component: () => import('@src/views/role/index.vue')
      },
      {
        path: 'assing-permission',
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
