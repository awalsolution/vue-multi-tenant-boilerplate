import type { RouteRecordRaw } from 'vue-router';
import { UsergroupAddOutlined } from '@vicons/antd';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'User';

const routes: RouteRecordRaw[] = [
  {
    path: '/user',
    name: routeName,
    redirect: '/user/list',
    component: DashboardLayout,
    meta: {
      title: 'User',
      icon: renderIcon(UsergroupAddOutlined),
      permissions: ['can view User menu'],
      sort: 3
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'User List',
          permissions: ['can view User menu']
        },
        component: () => import('@src/views/user/index.vue')
      },
      {
        path: 'profile',
        name: `${routeName}_profile`,
        meta: {
          title: 'User Profile',
          permissions: ['can view user profile'],
          hidden: true
        },
        component: () => import('@src/views/user/Profile.vue')
      },
      {
        path: 'assing-permission',
        name: `${routeName}_assing_permission`,
        meta: {
          title: 'Assing Permission',
          permissions: ['can view assign permission'],
          hidden: true
        },
        component: () => import('@src/components/permission/AssignPermissions.vue')
      }
    ]
  }
];

export default routes;
