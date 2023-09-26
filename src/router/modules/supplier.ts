import type { RouteRecordRaw } from 'vue-router';
import { ShopOutlined } from '@vicons/antd';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'supplier';

const routes: RouteRecordRaw[] = [
  {
    path: '/supplier',
    name: routeName,
    redirect: '/supplier/list',
    component: DashboardLayout,
    meta: {
      title: 'Supplier',
      icon: renderIcon(ShopOutlined),
      permissions: ['can view supplier'],
      sort: 2
    },
    children: [
      {
        path: 'Supplier list',
        name: `${routeName}_list`,
        meta: {
          title: 'Supplier List',
          permissions: ['can view supplier']
        },
        component: () => import('@src/views/supplier/index.vue')
      }
    ]
  }
];

export default routes;
