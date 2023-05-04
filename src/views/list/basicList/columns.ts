import { h } from 'vue';
import { NAvatar } from 'naive-ui';

export const columns = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'Title',
    key: 'name',
    width: 100,
  },
  {
    title: 'Avatar',
    key: 'avatar',
    width: 100,
    render(row) {
      return h(NAvatar, {
        size: 48,
        src: row.avatar,
      });
    },
  },
  {
    title: 'Address',
    key: 'address',
    auth: ['basic_list'], // At the same time, control whether to display according to the authority
    ifShow: (_column) => {
      return true; // Whether to display according to business control
    },
    width: 150,
  },
  {
    title: 'Start Date',
    key: 'beginTime',
    width: 160,
  },
  {
    title: 'End Date',
    key: 'endTime',
    width: 160,
  },
  {
    title: 'Creation time',
    key: 'date',
    width: 100,
  },
];
