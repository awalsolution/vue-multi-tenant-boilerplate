import { http } from '@/utils/http/axios';

// get table
export function getTableList(params) {
  return http.request({
    url: '/table/list',
    method: 'get',
    params,
  });
}
