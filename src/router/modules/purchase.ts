import type { RouteRecordRaw } from 'vue-router';
import { ShoppingCartOutlined } from '@vicons/antd';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'purchase';

const routes: RouteRecordRaw[] = [
  {
    path: '/purchase',
    name: routeName,
    redirect: '/purchase/list',
    component: DashboardLayout,
    meta: {
      title: 'Purchase',
      icon: renderIcon(ShoppingCartOutlined),
      permissions: ['can view purchase menu'],
      sort: 2
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Purchase List',
          permissions: ['can view purchase list']
        },
        component: () => import('@src/views/purchase/index.vue')
      }
    ]
  }
];

export default routes;
