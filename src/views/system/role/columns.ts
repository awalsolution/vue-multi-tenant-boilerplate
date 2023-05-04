import { h } from 'vue';
import { NTag } from 'naive-ui';

export const columns = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: 'role name',
    key: 'name',
  },
  {
    title: 'Description',
    key: 'explain',
  },
  {
    title: 'Is the default role',
    key: 'isDefault',
    render(row: any) {
      return h(
        NTag,
        {
          type: row.isDefault ? 'success' : 'error',
        },
        {
          default: () => (row.isDefault ? 'Yes' : 'No'),
        }
      );
    },
  },
  {
    title: 'Creation time',
    key: 'create_date',
  },
];
