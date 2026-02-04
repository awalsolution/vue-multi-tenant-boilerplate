import type { RouteRecordRaw } from 'vue-router';
import { DashboardLayout } from '@/router/constant';

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: {
      title: 'Home',
      permissions: ['dashboard menu'],
      sort: 1,
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'pi pi-fw pi-home',
          permissions: ['dashboard menu'],
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
];

export default routes;
