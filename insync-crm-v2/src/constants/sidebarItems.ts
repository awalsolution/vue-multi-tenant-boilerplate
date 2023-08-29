import type { MenuOption } from 'naive-ui';
import { RenderUtils } from '@src/utils/render';
import {
  DocumentSync24Regular,
  TagLock32Regular,
  DocumentArrowRight20Regular,
} from '@vicons/fluent';
import {
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  UnlockOutlined,
  FileSyncOutlined,
} from '@vicons/antd';

const { renderIcon: renderMenuIcon, renderMenuLabel } = RenderUtils;

export const menuOptions: MenuOption[] = [
  {
    label: renderMenuLabel('Dashboard'),
    key: 'dashboard',
    icon: renderMenuIcon(DashboardOutlined),
    permissions: ['can view dashboard'],
  },
  {
    label: renderMenuLabel('System Setting'),
    key: 'system-setting',
    icon: renderMenuIcon(SettingOutlined),
    permissions: ['can view system setting'],
    children: [
      {
        label: renderMenuLabel('Users'),
        key: 'users',
        icon: renderMenuIcon(UserOutlined),
        permissions: ['can view users'],
      },
      {
        label: renderMenuLabel('Permissions'),
        key: 'permissions',
        icon: renderMenuIcon(TagLock32Regular),
        permissions: ['can view permissions'],
      },
      {
        label: renderMenuLabel('Roles'),
        key: 'roles',
        icon: renderMenuIcon(UnlockOutlined),
        permissions: ['can view roles'],
      },
    ],
  },
  {
    label: renderMenuLabel('Shops'),
    key: 'shops',
    icon: renderMenuIcon(BarChartOutlined),
    permissions: ['can view shop'],
  },
  {
    label: renderMenuLabel('Products'),
    key: 'products',
    icon: renderMenuIcon(DocumentSync24Regular),
    permissions: ['can view products'],
    children: [
      {
        label: renderMenuLabel('List'),
        key: 'product_list',
        icon: renderMenuIcon(FileSyncOutlined),
        permissions: ['can view products'],
      },
      {
        label: renderMenuLabel('Add'),
        key: 'product_add',
        icon: renderMenuIcon(DocumentArrowRight20Regular),
        permissions: ['can view add product'],
      },
      {
        label: renderMenuLabel('Attributes'),
        key: 'product_attributes',
        icon: renderMenuIcon(DocumentArrowRight20Regular),
      },
      {
        label: renderMenuLabel('Categories'),
        key: 'product_categories',
        icon: renderMenuIcon(DocumentArrowRight20Regular),
      },
    ],
  },
];
