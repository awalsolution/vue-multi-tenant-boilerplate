import { ErrorPage, RedirectName, DashboardLayout } from '@/router/constant';
import type { RouteRecordRaw } from 'vue-router';

// 404 on a page
export const ErrorPageRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: DashboardLayout,
  meta: {
    title: 'Error Page',
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPageSon',
      component: ErrorPage,
      meta: {
        title: 'Error Page',
      },
    },
  ],
};

export const RedirectRoute: RouteRecordRaw = {
  path: '/redirect',
  name: 'redirect-layout',
  component: DashboardLayout,
  meta: {
    title: RedirectName,
    dismissTab: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'redirect',
      component: () => import('@/views/common/redirect/index.vue'),
      meta: {
        title: 'Redirect',
        dismissTab: true,
      },
    },
  ],
};
