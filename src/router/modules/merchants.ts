import type { RouteRecordRaw } from 'vue-router';
import { ShopOutlined } from '@vicons/antd';
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
      icon: renderIcon(ShopOutlined),
      permissions: ['can view merchant'],
      sort: 2
    },
    children: [
      {
        path: 'Merchant list',
        name: `${routeName}_list`,
        meta: {
          title: 'Merchant List',
          permissions: ['can view merchant']
        },
        component: () => import('@src/views/merchant/index.vue')
      }
    ]
  }
];

export default routes;
