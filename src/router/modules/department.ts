import type { RouteRecordRaw } from 'vue-router';
import { HomePerson24Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'department';

const routes: RouteRecordRaw[] = [
  {
    path: '/department',
    name: routeName,
    redirect: '/department/list',
    component: DashboardLayout,
    meta: {
      title: 'Department',
      icon: renderIcon(HomePerson24Regular),
      permissions: ['can view department menu'],
      sort: 2
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Department List',
          permissions: ['can view department menu']
        },
        component: () => import('@src/views/department/index.vue')
      }
    ]
  }
];

export default routes;
