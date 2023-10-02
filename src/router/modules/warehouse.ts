import type { RouteRecordRaw } from 'vue-router';
import { BuildingWarehouse } from '@vicons/tabler';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'warehouse';

const routes: RouteRecordRaw[] = [
  {
    path: '/warehouse',
    name: routeName,
    redirect: '/warehouse/list',
    component: DashboardLayout,
    meta: {
      title: 'warehouse',
      icon: renderIcon(BuildingWarehouse),
      permissions: ['can view warehouse menu'],
      sort: 7
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'warehouse List',
          permissions: ['can view warehouse list']
        },
        component: () => import('@src/views/warehouse/index.vue')
      }
    ]
  }
];

export default routes;
