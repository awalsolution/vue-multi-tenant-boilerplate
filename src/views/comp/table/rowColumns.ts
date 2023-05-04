import { h } from 'vue';
import { NAvatar } from 'naive-ui';

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
    editComponent: 'NInput',
    editRow: true,
    // Validation required by default
    editRule: true,
    edit: true,
    width: 200,
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
    editRow: true,
    editComponent: 'NSelect',
    editComponentProps: {
      options: [
        {
          label: 'Guangdong Province',
          value: 1,
        },
        {
          label: 'Zhejiang Province',
          value: 2,
        },
      ],
    },
    edit: true,
    width: 200,
    ellipsis: false,
  },
  {
    title: 'Start Date',
    key: 'beginTime',
    editRow: true,
    edit: true,
    width: 240,
    editComponent: 'NDatePicker',
    editComponentProps: {
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
    ellipsis: false,
  },
  {
    title: 'End Date',
    key: 'endTime',
    width: 160,
  },
  {
    title: 'Status',
    key: 'status',
    editRow: true,
    edit: true,
    width: 100,
    editComponent: 'NSwitch',
    editValueMap: (value) => {
      return value ? 'Enable' : 'Disable';
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
