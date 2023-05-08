import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { SettingsOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'System',
    redirect: '/system/menu',
    component: Layout,
    meta: {
      title: 'System Settings',
      icon: renderIcon(SettingsOutline),
      sort: 1,
    },
    children: [
      {
        path: 'user',
        name: 'system_user',
        meta: {
          title: 'Users',
        },
        component: () => import('@/views/list/basicList/index.vue'),
      },
      {
        path: 'role',
        name: 'system_role',
        meta: {
          title: 'Roles',
        },
        component: () => import('@/views/list/basicList/index.vue'),
      },
      {
        path: 'permission',
        name: 'system_permission',
        meta: {
          title: 'Permissions',
        },
        component: () => import('@/views/list/basicList/index.vue'),
      },
    ],
  },
];

export default routes;
