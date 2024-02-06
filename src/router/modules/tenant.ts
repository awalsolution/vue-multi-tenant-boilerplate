import type { RouteRecordRaw } from 'vue-router';
import { Organization16Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'tenant';

const routes: RouteRecordRaw[] = [
  {
    path: '/tenant',
    name: routeName,
    redirect: '/tenant/list',
    component: DashboardLayout,
    meta: {
      title: 'Tenant',
      icon: renderIcon(Organization16Regular),
      permissions: ['can view company menu'],
      sort: 1
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Tenant List',
          permissions: ['can view company menu']
        },
        component: () => import('@src/views/tenant/index.vue')
      }
    ]
  }
];

export default routes;
