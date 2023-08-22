import { RouteRecordRaw } from 'vue-router';
import {
  DocumentSync24Regular,
  TagLock32Regular,
  DocumentArrowRight20Regular,
} from '@vicons/fluent';
import {
  DashboardOutlined,
  BarChartOutlined,
  UserOutlined,
  UnlockOutlined,
  FileSyncOutlined,
} from '@vicons/antd';

export const DashboardRoute: RouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  redirect: '/dashboard',
  component: () => import('@src/layouts/DashbaordLayout/index.vue'),
  children: [
    {
      path: '',
      name: 'dashbaord',
      meta: {
        title: 'Dashboard',
        icon: DashboardOutlined,
        permissions: ['can view dashboard'],
      },
      component: () => import('@src/views/dashboard/index.vue'),
    },
    {
      path: 'system/users',
      name: 'users',
      meta: {
        title: 'Users',
        icon: UserOutlined,
        permissions: ['can view users'],
      },
      component: () => import('@src/views/users/index.vue'),
    },
    {
      path: 'profile',
      name: 'profile',
      meta: {
        title: 'Profile',
        icon: UserOutlined,
        permissions: ['can view profile'],
      },
      component: () => import('@src/views/users/Profile.vue'),
    },
    {
      path: 'system/permissions',
      name: 'permissions',
      meta: {
        title: 'Permissions',
        icon: TagLock32Regular,
        permissions: ['can view permissions'],
      },
      component: () => import('@src/views/permissions/index.vue'),
    },
    {
      path: 'system/roles',
      name: 'roles',
      meta: {
        title: 'Roles',
        icon: UnlockOutlined,
        permissions: ['can view roles'],
      },
      component: () => import('@src/views/roles/index.vue'),
    },
    {
      path: 'shops',
      name: 'shops',
      meta: {
        title: 'Shops',
        icon: BarChartOutlined,
        permissions: ['can view shop'],
      },
      component: () => import('@src/views/shop/index.vue'),
    },
    {
      path: 'products/list',
      name: 'product_list',
      meta: {
        title: 'Product',
        icon: FileSyncOutlined,
        permissions: ['can view products'],
      },
      component: () => import('@src/views/products/index.vue'),
    },
    {
      path: 'product/add',
      name: 'product_add',
      meta: {
        title: 'Add Product',
        icon: DocumentArrowRight20Regular,
        permissions: ['can view add product'],
      },
      component: () => import('@src/components/products/AddProduct.vue'),
    },
    {
      path: 'product/update/:id',
      name: 'product_update',
      meta: {
        title: 'Edit Product',
        permissions: ['can view edit product'],
      },
      component: () => import('@src/components/products/EditProduct.vue'),
    },
    {
      path: 'product/attributes',
      name: 'product_attributes',
      meta: {
        title: 'Product Attributes',
        icon: DocumentArrowRight20Regular,
        permissions: ['can view edit product'],
      },
      component: () => import('@src/views/products/attributes/index.vue'),
    },
    {
      path: 'product/variants',
      name: 'product_variants',
      meta: {
        title: 'Product Variants',
        icon: DocumentSync24Regular,
        permissions: ['can view edit product'],
      },
      component: () => import('@src/views/products/variants/index.vue'),
    },
    {
      path: 'product/variants/add',
      name: 'product_variants_add',
      meta: {
        title: 'Edit Variant',
        permissions: ['can view edit product'],
      },
      component: () => import('@src/components/products/variants/AddVariant.vue'),
    },
    {
      path: 'product/variants/:id',
      name: 'product_variants_update',
      meta: {
        title: 'Edit Variant',
        permissions: ['can view edit product'],
      },
      component: () => import('@src/components/products/variants/EditVariant.vue'),
    },
    {
      path: 'product/categories',
      name: 'product_categories',
      meta: {
        title: 'Edit Variant',
        icon: DocumentSync24Regular,
        permissions: ['can view edit product'],
      },
      component: () => import('@src/views/products/categories/index.vue'),
    },
  ],
};
