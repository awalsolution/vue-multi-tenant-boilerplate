import type { RouteRecordRaw } from 'vue-router';
import { LockClosed32Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'permission';

const routes: RouteRecordRaw[] = [
  {
    path: '/permission',
    name: routeName,
    redirect: '/permission/list',
    component: DashboardLayout,
    meta: {
      title: 'Permission',
      icon: renderIcon(LockClosed32Regular),
      permissions: ['can view permission menu'],
      sort: 4
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Permission List',
          permissions: ['can view permission menu']
        },
        component: () => import('@src/views/permission/index.vue')
      }
    ]
  }
];

export default routes;
