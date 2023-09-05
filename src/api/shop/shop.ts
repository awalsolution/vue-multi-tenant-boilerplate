import { http } from '@/utils/http/axios';

export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}

export interface BasicPageParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}

/**
 * @description: Get shop list
 */
export function getShopsApi() {
  return http.request({
    url: '/shops',
    method: 'get',
  });
}
