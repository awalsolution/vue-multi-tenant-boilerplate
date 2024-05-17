import type { RouteRecordRaw } from 'vue-router';
import { DollarCircleOutlined } from '@vicons/antd';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'plan';

const routes: RouteRecordRaw[] = [
  {
    path: '/plan',
    name: routeName,
    redirect: '/plan/list',
    component: DashboardLayout,
    meta: {
      title: 'Plan',
      icon: renderIcon(DollarCircleOutlined),
      permissions: ['can view plan menu'],
      sort: 2
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Plan List',
          permissions: ['can view plan menu']
        },
        component: () => import('@src/views/plan/index.vue')
      },
      {
        path: 'add',
        name: `${routeName}_add`,
        meta: {
          title: 'Add Plan',
          permissions: ['can view create plan']
        },
        component: () => import('@src/components/plan/AddPlan.vue')
      },
      {
        path: 'edit',
        name: `${routeName}_edit`,
        meta: {
          title: 'Edit Plan',
          permissions: ['can view update plan'],
          hidden: true,
          dismissTab: true
        },
        component: () => import('@src/components/plan/EditPlan.vue')
      }
    ]
  }
];

export default routes;
