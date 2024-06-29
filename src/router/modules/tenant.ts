import type { RouteRecordRaw } from 'vue-router';
import { Organization16Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'organization';

const routes: RouteRecordRaw[] = [
  {
    path: '/organization',
    name: routeName,
    redirect: '/organization/list',
    component: DashboardLayout,
    meta: {
      title: 'Organization',
      icon: renderIcon(Organization16Regular),
      permissions: ['tenant menu'],
      sort: 1
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Organization List',
          permissions: ['tenant menu']
        },
        component: () => import('@src/views/tenant/index.vue')
      },
      {
        path: 'add',
        name: `${routeName}_add`,
        meta: {
          title: 'Add Organization',
          permissions: ['create tenant']
        },
        component: () => import('@src/components/tenant/AddTenant.vue')
      },
      {
        path: 'edit/:id',
        name: `${routeName}_edit`,
        meta: {
          title: 'Edit Organization',
          permissions: ['update tenant'],
          hidden: true,
          dismissTab: true
        },
        component: () => import('@src/components/tenant/EditTenant.vue')
      },
      {
        path: 'view/:db',
        name: `${routeName}_view`,
        meta: {
          title: 'View Organization',
          permissions: ['view tenant'],
          hidden: true,
          dismissTab: true
        },
        component: () => import('@src/components/tenant/ViewTenant.vue')
      },
      {
        path: 'edit-role/:db/:role_id',
        name: `${routeName}_edit_role`,
        meta: {
          title: 'Assign Permission',
          permissions: ['update tenant'],
          hidden: true,
          dismissTab: true
        },
        component: () => import('@src/components/tenant/AssignPermission.vue')
      }
    ]
  }
];

export default routes;
