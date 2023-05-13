import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ShopOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routeName = 'shop';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/shop',
    name: routeName,
    redirect: '/shop/list',
    component: Layout,
    meta: {
      title: 'Shop',
      icon: renderIcon(ShopOutlined),
      sort: 2,
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Shop',
        },
        component: () => import('@/views/shop/index.vue'),
      },
    ],
  },
];

export default routes;
