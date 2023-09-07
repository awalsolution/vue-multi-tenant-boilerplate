import { RouteRecordRaw } from 'vue-router';
import { ShopOutlined } from '@vicons/antd';
import { DashboardLayout } from '@src/router/constant';
// import { renderIcon } from '@src/utils/render';

const routeName = 'shop';

export const routes: RouteRecordRaw = {
  path: '/shop',
  name: routeName,
  redirect: '/shop/list',
  component: DashboardLayout,
  meta: {
    title: 'Shop',
    icon: ShopOutlined,
    permissions: ['can view shops'],
    sort: 2,
  },
  children: [
    {
      path: 'list',
      name: `${routeName}_list`,
      meta: {
        title: 'Shop List',
        permissions: ['can view shops'],
      },
      component: () => import('@src/views/shop/index.vue'),
    },
  ],
};
