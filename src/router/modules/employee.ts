import type { RouteRecordRaw } from 'vue-router';
import { BuildingShop16Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'employee';

const routes: RouteRecordRaw[] = [
  {
    path: '/employee',
    name: routeName,
    redirect: '/employee/list',
    component: DashboardLayout,
    meta: {
      title: 'Employee',
      icon: renderIcon(BuildingShop16Regular),
      permissions: ['can view employee menu'],
      sort: 5
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Employee List',
          permissions: ['can view employee menu']
        },
        component: () => import('@src/views/employee/index.vue')
      },
      {
        path: 'profile',
        name: `${routeName}_profile`,
        meta: {
          title: 'Profile',
          permissions: ['can view employee profile'],
          hidden: true
        },
        component: () => import('@src/views/employee/Profile.vue')
      }
    ]
  }
];

export default routes;
