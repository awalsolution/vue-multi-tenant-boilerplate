import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { OptionsSharp } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

/**
 * @param name route name, must be set, and cannot be duplicated
 * @param meta Routing meta information (routing with extended information)
 * @param redirect redirection address, when accessing this route, it will be redirected by itself
 * @param meta.disabled disable the entire menu
 * @param meta.title menu title
 * @param meta.icon menu icon
 * @param meta.keepAlive cache the route
 * @param meta.sort The smaller the sort, the higher the ranking
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'System',
    redirect: '/system/menu',
    component: Layout,
    meta: {
      title: 'System Settings',
      icon: renderIcon(OptionsSharp),
      sort: 1,
    },
    children: [
      {
        path: 'menu',
        name: 'system_menu',
        meta: {
          title: 'Menu Permission',
        },
        component: () => import('@/views/system/menu/menu.vue'),
      },
      {
        path: 'role',
        name: 'system_role',
        meta: {
          title: 'Role Permission',
        },
        component: () => import('@/views/system/role/role.vue'),
      },
    ],
  },
];

export default routes;
