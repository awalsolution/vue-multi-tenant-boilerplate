import { RouteRecordRaw } from 'vue-router';
import { Layout, ParentLayout } from '@/router/constant';
import { WalletOutlined } from '@vicons/antd';
import { renderIcon, renderNew } from '@/utils';

const routeName = 'comp';

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
    path: '/comp',
    name: routeName,
    component: Layout,
    redirect: '/comp/table',
    meta: {
      title: 'Component',
      icon: renderIcon(WalletOutlined),
      sort: 8,
    },
    children: [
      {
        path: 'table',
        name: `${routeName}_table`,
        redirect: '/comp/table/basic',
        component: ParentLayout,
        meta: {
          title: 'Sheet',
        },
        children: [
          {
            path: 'basic',
            name: `${routeName}_table_basic`,
            meta: {
              title: 'Basic Form',
            },
            component: () => import('@/views/comp/table/basic.vue'),
          },
          {
            path: 'editCell',
            name: `${routeName}_table_editCell`,
            meta: {
              title: 'Cell Editing',
            },
            component: () => import('@/views/comp/table/editCell.vue'),
          },
          {
            path: 'editRow',
            name: `${routeName}_table_editRow`,
            meta: {
              title: 'Whole Line Edit',
            },
            component: () => import('@/views/comp/table/editRow.vue'),
          },
        ],
      },
      {
        path: 'form',
        name: `${routeName}_form`,
        redirect: '/comp/form/basic',
        component: ParentLayout,
        meta: {
          title: 'Form',
        },
        children: [
          {
            path: 'basic',
            name: `${routeName}_form_basic`,
            meta: {
              title: 'Basic Use',
            },
            component: () => import('@/views/comp/form/basic.vue'),
          },
          {
            path: 'useForm',
            name: `useForm`,
            meta: {
              title: 'UseForm',
            },
            component: () => import('@/views/comp/form/useForm.vue'),
          },
        ],
      },
      {
        path: 'upload',
        name: `${routeName}_upload`,
        meta: {
          title: 'Upload Image',
        },
        component: () => import('@/views/comp/upload/index.vue'),
      },
      {
        path: 'modal',
        name: `${routeName}_modal`,
        meta: {
          title: 'Popup Extension',
        },
        component: () => import('@/views/comp/modal/index.vue'),
      },
      {
        path: 'richtext',
        name: `richtext`,
        meta: {
          title: 'Rich Text',
          extra: renderNew(),
        },
        component: () => import('@/views/comp/richtext/vue-quill.vue'),
      },
      {
        path: 'drag',
        name: `Drag`,
        meta: {
          title: 'Drag and Drop',
          extra: renderNew(),
        },
        component: () => import('@/views/comp/drag/index.vue'),
      },
    ],
  },
];

export default routes;
