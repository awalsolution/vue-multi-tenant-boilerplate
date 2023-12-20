import type { RouteRecordRaw } from 'vue-router';
import { TruckDelivery } from '@vicons/tabler';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'supplier';

const routes: RouteRecordRaw[] = [
  {
    path: '/supplier',
    name: routeName,
    redirect: '/supplier/list',
    component: DashboardLayout,
    meta: {
      title: 'Supplier',
      icon: renderIcon(TruckDelivery),
      permissions: ['can view supplier menu'],
      sort: 4
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Supplier List',
          permissions: ['can view supplier list']
        },
        component: () => import('@src/views/supplier/index.vue')
      },
      {
        path: 'update/:id',
        name: `${routeName}_update`,
        meta: {
          title: 'Update Supplier',
          permissions: ['can view supplier update'],
          hidden: true
        },
        component: () => import('@src/components/supplier/EditSupplier.vue')
      }
    ]
  }
];

export default routes;
