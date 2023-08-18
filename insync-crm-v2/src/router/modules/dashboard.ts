import { RouteRecordRaw } from 'vue-router';
import { DashboardOutlined } from '@vicons/antd';

export const DashboardRoute: RouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard-layout',
  redirect: '/dashboard',
  component: () => import('@src/layouts/DashbaordLayout/index.vue'),
  meta: {
    title: 'Dashboard',
    icon: DashboardOutlined,
    permissions: ['can view dashboard'],
    sort: 0,
  },
  children: [
    {
      path: '',
      name: 'dashbaord',
      meta: {
        title: 'Dashboard',
        icon: DashboardOutlined,
        permissions: ['can view dashboard'],
      },
      component: () => import('@src/views/dashboard/index.vue'),
    },
  ],
};
