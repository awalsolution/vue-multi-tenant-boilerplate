import type { RouteRecordRaw } from 'vue-router';
import { AccessAlarmFilled } from '@vicons/material';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'attendance';

const routes: RouteRecordRaw[] = [
  {
    path: '/attendance',
    name: routeName,
    redirect: '/attendance/list',
    component: DashboardLayout,
    meta: {
      title: 'Attendance',
      icon: renderIcon(AccessAlarmFilled),
      permissions: ['can view attendance menu'],
      sort: 2
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Attendance List',
          permissions: ['can view attendance menu']
        },
        component: () => import('@src/views/attendance/index.vue')
      }
    ]
  }
];

export default routes;
