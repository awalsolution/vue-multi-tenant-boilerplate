import type { RouteRecordRaw } from 'vue-router';
import { BuildingWarehouse } from '@vicons/tabler';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'merchant';

const routes: RouteRecordRaw[] = [
  {
    path: '/merchant',
    name: routeName,
    redirect: '/merchant/list',
    component: DashboardLayout,
    meta: {
      title: 'merchant',
      icon: renderIcon(BuildingWarehouse),
      permissions: ['can view merchant menu'],
      sort: 3
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Merchant List',
          permissions: ['can view merchant list']
        },
        component: () => import('@src/views/merchant/index.vue')
      }
    ]
  }
];

export default routes;
