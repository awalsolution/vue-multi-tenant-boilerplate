import type { RouteRecordRaw } from 'vue-router';
import { WarehouseOutlined } from '@vicons/material';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'company';

const routes: RouteRecordRaw[] = [
  {
    path: '/company',
    name: routeName,
    redirect: '/company/list',
    component: DashboardLayout,
    meta: {
      title: 'Company',
      icon: renderIcon(WarehouseOutlined),
      permissions: ['can view company menu'],
      sort: 9
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Company List',
          permissions: ['can view company menu']
        },
        component: () => import('@src/views/company/index.vue')
      }
    ]
  }
];

export default routes;
