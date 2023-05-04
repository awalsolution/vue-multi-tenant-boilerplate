import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { TableOutlined } from '@vicons/antd';
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
    path: '/list',
    name: 'List',
    redirect: '/list/basic-list',
    component: Layout,
    meta: {
      title: 'List Page',
      icon: renderIcon(TableOutlined),
      sort: 2,
    },
    children: [
      {
        path: 'basic-list',
        name: 'basic-list',
        meta: {
          title: 'Base List',
        },
        component: () => import('@/views/list/basicList/index.vue'),
      },
      {
        path: 'basic-info/:id?',
        name: 'basic-info',
        meta: {
          title: 'Basic Details',
          hidden: true,
          activeMenu: 'basic-list',
        },
        component: () => import('@/views/list/basicList/info.vue'),
      },
    ],
  },
];

export default routes;
