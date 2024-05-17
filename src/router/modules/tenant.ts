import type { RouteRecordRaw } from 'vue-router';
import { Organization16Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'tenant';

const routes: RouteRecordRaw[] = [
  {
    path: '/tenant',
    name: routeName,
    redirect: '/tenant/list',
    component: DashboardLayout,
    meta: {
      title: 'Tenant',
      icon: renderIcon(Organization16Regular),
      permissions: ['view tenant menu'],
      sort: 1
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Tenant List',
          permissions: ['view tenant menu']
        },
        component: () => import('@src/views/tenant/index.vue')
      },
      {
        path: 'view',
        name: `${routeName}_view`,
        meta: {
          title: 'Tenant Detail',
          permissions: ['view tenant menu'],
          hidden: true
        },
        component: () => import('@src/components/tenant/ViewTenantDetail.vue')
      },
      {
        path: 'add',
        name: `${routeName}_add`,
        meta: {
          title: 'Add Tenant',
          permissions: ['can view create tenant']
        },
        component: () => import('@src/components/tenant/AddTenant.vue')
      }
      // {
      //   path: 'edit',
      //   name: `${routeName}_edit`,
      //   meta: {
      //     title: 'Edit Tenant',
      //     permissions: ['can view update tenant']
      //   },
      //   component: () => import('@src/components/tenant/EditTenant.vue')
      // }
      // {
      //   path: 'insert-role',
      //   name: `${routeName}_insert_role`,
      //   meta: {
      //     title: 'Insert Role',
      //     permissions: ['role tenant menu'],
      //     hidden: true
      //   },
      //   component: () => import('@src/components/Role/RoleToTenantDB.vue')
      // }
    ]
  }
];

export default routes;
