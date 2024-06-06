import type { RouteRecordRaw } from 'vue-router';
import { InfoCircleOutlined } from '@vicons/antd';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'menu';

const routes: RouteRecordRaw[] = [
  {
    path: '/menu',
    name: routeName,
    redirect: '/menu/list',
    component: DashboardLayout,
    meta: {
      title: 'Menu',
      icon: renderIcon(InfoCircleOutlined),
      permissions: ['menu menu'],
      sort: 5
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Menu List',
          permissions: ['menu menu']
        },
        component: () => import('@src/views/menu/index.vue')
      },
      {
        path: 'add',
        name: `${routeName}_add`,
        meta: {
          title: 'Add Menu',
          permissions: ['create menu']
        },
        component: () => import('@src/components/menu/AddMenu.vue')
      },
      {
        path: 'edit',
        name: `${routeName}_edit`,
        meta: {
          title: 'Edit Menu',
          permissions: ['update menu'],
          hidden: true,
          dismissTab: true
        },
        component: () => import('@src/components/menu/EditMenu.vue')
      }
    ]
  }
];

export default routes;
