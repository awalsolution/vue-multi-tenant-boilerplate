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
 * @description: Get Customers list
 */
export function getCustomersApi(params: any) {
  return http.request({
    url: '/customers',
    method: 'get',
    params,
  });
}
