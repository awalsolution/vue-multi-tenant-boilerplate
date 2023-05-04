import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CheckCircleOutlined } from '@vicons/antd';
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
    path: '/result',
    name: 'Result',
    redirect: '/result/success',
    component: Layout,
    meta: {
      title: 'Results page',
      icon: renderIcon(CheckCircleOutlined),
      sort: 4,
    },
    children: [
      {
        path: 'success',
        name: 'result-success',
        meta: {
          title: 'Success page',
        },
        component: () => import('@/views/result/success.vue'),
      },
      {
        path: 'fail',
        name: 'result-fail',
        meta: {
          title: 'failure page',
        },
        component: () => import('@/views/result/fail.vue'),
      },
      {
        path: 'info',
        name: 'result-info',
        meta: {
          title: 'Information Page',
        },
        component: () => import('@/views/result/info.vue'),
      },
    ],
  },
];

export default routes;
