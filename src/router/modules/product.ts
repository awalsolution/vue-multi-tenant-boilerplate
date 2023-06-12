import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CartOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const routeName = 'product';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/product',
    name: routeName,
    redirect: '/product/list',
    component: Layout,
    meta: {
      title: 'Product',
      icon: renderIcon(CartOutline),
      permissions: ['can view products'],
      sort: 3,
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Product List',
          permissions: ['can view products'],
        },
        component: () => import('@/views/products/index.vue'),
      },
      {
        path: 'add',
        name: `${routeName}_add`,
        meta: {
          title: 'Add Product',
          permissions: ['can view products'],
        },
        component: () => import('@/views/products/AddProduct.vue'),
      },
      {
        path: 'attributes',
        name: `${routeName}_attributes`,
        meta: {
          title: 'Product Attributes',
          permissions: ['can view products'],
        },
        component: () => import('@/views/products/attributes/index.vue'),
      },
      {
        path: 'categories',
        name: `${routeName}_categories`,
        meta: {
          title: 'Product Categories',
          permissions: ['can view products'],
        },
        component: () => import('@/views/products/categories/index.vue'),
      },
    ],
  },
];

export default routes;
