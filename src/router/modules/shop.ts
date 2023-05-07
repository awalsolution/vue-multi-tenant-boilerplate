import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DashboardOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routeName = 'shop';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/shop',
    name: routeName,
    redirect: '/shop/list',
    component: Layout,
    meta: {
      title: 'Shop',
      icon: renderIcon(DashboardOutlined),
      permissions: ['can_view_shop'],
      // sort: 0,
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Shop',
          // permissions: ['can_create_users'],
        },
        component: () => import('@/views/dashboard/console/console.vue'),
      },
      // {
      //   path: 'monitor',
      //   name: `${routeName}_monitor`,
      //   meta: {
      //     title: 'monitoring',
      //     permissions: ['dashboard_monitor'],
      //   },
      //   component: () => import('@/views/dashboard/monitor/monitor.vue'),
      // },
      // {
      //   path: 'workplace',
      //   name: `${routeName}_workplace`,
      //   meta: {
      //     title: 'workbench',
      //     keepAlive: true,
      //     permissions: ['dashboard_workplace'],
      //   },
      //   component: () => import('@/views/dashboard/workplace/workplace.vue'),
      // },
    ],
  },
];

export default routes;
