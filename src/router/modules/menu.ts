import type { RouteRecordRaw } from 'vue-router';
import { InfoCircleOutlined } from '@vicons/antd';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'menu';

const routes: RouteRecordRaw[] = [
  {
    path: '/menu',
    name: routeName,
    redirect: '/menu/list',
    component: DashboardLayout,
    meta: {
      title: 'Menu',
      icon: renderIcon(InfoCircleOutlined),
      permissions: ['can view menu menu'],
      sort: 5
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Menu List',
          permissions: ['can view menu menu']
        },
        component: () => import('@src/views/menu/index.vue')
      }
    ]
  }
];

export default routes;
