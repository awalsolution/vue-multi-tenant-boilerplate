import type { RouteRecordRaw } from 'vue-router';
import { BuildingShop16Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'shop';

const routes: RouteRecordRaw[] = [
  {
    path: '/shop',
    name: routeName,
    redirect: '/shop/list',
    component: DashboardLayout,
    meta: {
      title: 'Shop',
      icon: renderIcon(BuildingShop16Regular),
      permissions: ['can view shop menu'],
      sort: 5
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Shop List',
          permissions: ['can view shop list']
        },
        component: () => import('@src/views/shop/index.vue')
      }
    ]
  }
];

export default routes;
