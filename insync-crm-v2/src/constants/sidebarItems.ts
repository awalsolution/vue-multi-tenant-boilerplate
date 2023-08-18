import type { MenuOption } from 'naive-ui';
import { RenderUtils } from '@src/utils/render';

import { DocumentError24Regular } from '@vicons/fluent';
import { BarChartOutlined, SettingOutlined, UserOutlined } from '@vicons/antd';

const { renderIcon: renderMenuIcon, renderMenuLabel } = RenderUtils;

export const menuOptions: MenuOption[] = [
  {
    label: renderMenuLabel('System'),
    key: 'system',
    icon: renderMenuIcon(SettingOutlined),
    children: [
      {
        label: renderMenuLabel('User'),
        key: 'user',
        icon: renderMenuIcon(UserOutlined),
        show: false,
      },
    ],
  },
  {
    label: renderMenuLabel('Components'),
    key: 'components',
    icon: renderMenuIcon(BarChartOutlined),
    children: [
      {
        label: renderMenuLabel('Charts'),
        key: 'charts',
        icon: renderMenuIcon(BarChartOutlined),
      },
    ],
  },
  {
    label: renderMenuLabel('ErrorPages'),
    key: 'error-pages',
    icon: renderMenuIcon(DocumentError24Regular),
    children: [
      {
        label: renderMenuLabel('404'),
        key: '404',
        icon: renderMenuIcon(DocumentError24Regular),
      },
    ],
  },
];
