import type { RouteRecordRaw } from 'vue-router';
import { DashboardLayout } from '@src/router/constant';

const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/dashboard',
    meta: {
      title: 'Admin',
      sort: 2
    },
    children: [
      {
        path: '/organization',
        meta: {
          title: 'Organization',
          icon: 'pi pi-fw pi-bookmark',
          permissions: ['tenant menu']
        },
        children: [
          {
            path: '/organization/list',
            name: 'organization_list',
            meta: {
              title: 'Organization List',
              icon: 'pi pi-fw pi-globe',
              permissions: ['tenant menu']
            },
            component: () => import('@src/views/tenant/index.vue')
          },
          {
            path: '/organization/add',
            name: 'organization_add',
            meta: {
              title: 'Add Organization',
              icon: 'pi pi-fw pi-file',
              permissions: ['create tenant']
            },
            component: () => import('@src/components/tenant/CreateTenant.vue')
          },
          {
            path: '/organization/:tenantId/edit',
            name: 'organization_edit',
            meta: {
              title: 'Edit Organization',
              permissions: ['update tenant'],
              hidden: true
            },
            component: () => import('@src/components/tenant/UpdateTenant.vue')
          },
          {
            path: '/organization/organization-details/:db_name',
            name: 'organization_details',
            meta: {
              title: 'View Organization',
              permissions: ['view tenant'],
              hidden: true
            },
            component: () => import('@src/components/tenant/TenantDetails.vue')
          },
          // tenant user operations
          {
            path: '/organization/edit-user-of-organization/:db_name/:user_id',
            name: 'organization_edit_user',
            meta: {
              title: 'Edit User',
              permissions: ['update tenant'],
              hidden: true
            },
            component: () => import('@src/components/tenant/EditUserOfTenant.vue')
          },
          // tenant roles operations
          {
            path: '/organization/insert-roles-of-organization/:db_name',
            name: 'organization_insert_role',
            meta: {
              title: 'Insert Role',
              permissions: ['update tenant'],
              hidden: true
            },
            component: () => import('@src/components/tenant/InsertRolesOfTenant.vue')
          },
          {
            path: '/organization/edit-role-of-organization/:db_name/:role_id',
            name: 'organization_edit_role',
            meta: {
              title: 'Edit Role',
              permissions: ['update tenant'],
              hidden: true
            },
            component: () => import('@src/components/tenant/AssignPermissionToTenantRole.vue')
          },
          // tenant permission operations
          {
            path: '/organization/insert-permissions-of-organization/:db_name',
            name: 'organization_insert_permission',
            meta: {
              title: 'Insert Permissions',
              permissions: ['update tenant'],
              hidden: true
            },
            component: () => import('@src/components/tenant/InsertPermissionsOfTenant.vue')
          }
        ]
      },
      {
        path: '/user/list',
        name: 'user_list',
        meta: {
          title: 'Users',
          icon: 'pi pi-fw pi-user',
          permissions: ['user menu']
        },
        component: () => import('@src/views/user/index.vue')
      },
      {
        path: '/user/profile',
        name: 'user_profile',
        meta: {
          title: 'User Profile',
          permissions: ['user profile'],
          hidden: true
        },
        component: () => import('@src/views/user/Profile.vue')
      },
      {
        path: '/user/:userId/assign-permission',
        name: 'user_assign_permission',
        meta: {
          title: 'Assing Permission',
          permissions: ['user assign permission'],
          hidden: true
        },
        component: () => import('@src/components/permission/AssignPermissions.vue')
      },
      {
        path: '/permission/list',
        name: 'permission_list',
        meta: {
          title: 'Permissions',
          icon: 'pi pi-fw pi-sign-in',
          permissions: ['permission menu']
        },
        component: () => import('@src/views/permission/index.vue')
      },
      {
        path: '/plan/list',
        name: 'plan_list',
        meta: {
          title: 'Plans',
          icon: 'pi pi-fw pi-check-square',
          permissions: ['plan menu']
        },
        component: () => import('@src/views/plan/index.vue')
      },
      {
        path: '/role/list',
        name: 'role_list',
        meta: {
          title: 'Roles',
          icon: 'pi pi-fw pi-lock',
          permissions: ['role menu']
        },
        component: () => import('@src/views/role/index.vue')
      },
      {
        path: '/role/:roleId/assign-permission',
        name: 'role_assign_permission',
        meta: {
          title: 'Assing Permission',
          permissions: ['assign permission menu'],
          hidden: true
        },
        component: () => import('@src/components/permission/AssignPermissions.vue')
      }
    ]
  }
];

export default routes;
