import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import { SiteUtils } from '@src/utils/site';
import { processRouteTag } from '@src/router/tabs';
import type { IModuleType } from '@src/router/types';
import { AuthLayout } from '@src/router/constant';
import { handleModuleRoutes } from '@src/utils/router/module';

NProgress.configure({ showSpinner: false });

const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', {
  eager: true,
});

export const asyncRoutes = handleModuleRoutes(modules);

// console.log('async routes ==>', asyncRoutes);

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/dashboard',
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'auth-layout',
  component: AuthLayout,
  children: [
    {
      path: '',
      name: 'login',
      component: () => import('@src/views/login/index.vue'),
      meta: {
        title: 'Login',
      },
    },
  ],
};

export const constantRouter: RouteRecordRaw[] = [LoginRoute, RootRoute];

export const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach((to: any) => {
  SiteUtils.setDocumentTitle(to.meta.title);
  processRouteTag(to);
  NProgress.done();
});

asyncRoutes.forEach((it: any) => {
  router.addRoute(it);
});

export function setupRouter(app: App) {
  app.use(router);
}
