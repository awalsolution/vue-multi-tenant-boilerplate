import { RouteRecordRaw } from 'vue-router';

const routeName = 'login';

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: routeName,
  component: () => import('@src/layouts/AuthLayout/index.vue'),
  meta: {
    title: 'Login',
  },
  children: [
    {
      path: '',
      name: routeName,
      component: () => import('@src/views/login/index.vue'),
      meta: {
        title: 'Login',
        dismissTab: true,
      },
    },
  ],
};
