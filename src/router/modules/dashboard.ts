import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DashboardOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routeName = 'dashboard';

/**
 * @param name route name, must be set, and cannot be duplicated
 * @param meta Routing meta information (routing with extended information)
 * @param redirect redirection address, when accessing this route, it will be redirected by itself
 * @param meta.disabled disable the entire menu
 * @param meta.title menu title
 * @param meta.icon menu icon
 * @param meta.keepAlive cache the route
 * @param meta.sort The smaller the sort, the higher the ranking
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: routeName,
    redirect: '/dashboard/console',
    component: Layout,
    meta: {
      title: 'Dashboard',
      icon: renderIcon(DashboardOutlined),
      permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
      sort: 0,
    },
    children: [
      {
        path: 'console',
        name: `${routeName}_console`,
        meta: {
          title: 'Console',
          permissions: ['dashboard_console'],
          affix: true,
        },
        component: () => import('@/views/dashboard/console/console.vue'),
      },
      {
        path: 'monitor',
        name: `${routeName}_monitor`,
        meta: {
          title: 'monitoring',
          permissions: ['dashboard_monitor'],
        },
        component: () => import('@/views/dashboard/monitor/monitor.vue'),
      },
      {
        path: 'workplace',
        name: `${routeName}_workplace`,
        meta: {
          title: 'workbench',
          keepAlive: true,
          permissions: ['dashboard_workplace'],
        },
        component: () => import('@/views/dashboard/workplace/workplace.vue'),
      },
    ],
  },
];

export default routes;
