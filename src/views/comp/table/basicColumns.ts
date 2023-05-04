import { h } from 'vue';
import { NAvatar, NTag } from 'naive-ui';

export const columns = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'Encoding',
    key: 'no',
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
    title: 'Status',
    key: 'status',
    width: 100,
    render(row) {
      return h(
        NTag,
        {
          type: row.status ? 'success' : 'error',
        },
        {
          default: () => (row.status ? 'enabled' : 'disabled'),
        }
      );
    },
  },
  {
    title: 'Creation time',
    key: 'date',
    width: 160,
  },
  {
    title: 'Stay Time',
    key: 'time',
    width: 80,
  },
];
