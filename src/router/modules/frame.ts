import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DesktopOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const IFrame = () => import('@/views/iframe/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/frame',
    name: 'Frame',
    redirect: '/frame/docs',
    component: Layout,
    meta: {
      title: 'External Page',
      sort: 8,
      icon: renderIcon(DesktopOutline),
    },
    children: [
      {
        path: 'naive-admin',
        name: 'naive-admin',
        meta: {
          title: 'Naive Admin',
          frameSrc: 'https://www.naiveadmin.com',
        },
        component: IFrame,
      },
      {
        path: 'docs',
        name: 'frame-docs',
        meta: {
          title: 'Project documentation (embedded)',
          frameSrc: 'https://jekip.github.io/docs',
        },
        component: IFrame,
      },
      {
        path: 'naive',
        name: 'frame-naive',
        meta: {
          title: 'NaiveUi (embedded)',
          frameSrc: 'https://www.naiveui.com',
        },
        component: IFrame,
      },
    ],
  },
];

export default routes;
