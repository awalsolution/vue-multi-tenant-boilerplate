import type { RouteRecordRaw } from 'vue-router';
import { BuildingShop16Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'designation';

const routes: RouteRecordRaw[] = [
  {
    path: '/designation',
    name: routeName,
    redirect: '/designation/list',
    component: DashboardLayout,
    meta: {
      title: 'Designation',
      icon: renderIcon(BuildingShop16Regular),
      permissions: ['can view designation menu'],
      sort: 2
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Designation List',
          permissions: ['can view designation menu']
        },
        component: () => import('@src/views/designation/index.vue')
      }
    ]
  }
];

export default routes;
