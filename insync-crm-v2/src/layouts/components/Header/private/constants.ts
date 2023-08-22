import { Component, h } from 'vue';
import { ProfileOutlined, UnlockOutlined, LogoutOutlined } from '@vicons/antd';
import { NIcon } from 'naive-ui';

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

export const userOptions = [
  {
    label: () => 'Profile',
    key: 'profile',
    icon: renderIcon(ProfileOutlined),
  },
  {
    label: () => 'Change Password',
    key: 'change-password',
    icon: renderIcon(UnlockOutlined),
  },
  {
    label: () => 'Logout',
    key: 'logout',
    icon: renderIcon(LogoutOutlined),
  },
];
