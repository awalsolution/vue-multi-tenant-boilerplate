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
 * @description: Get permission list
 */
export function getPermissionsApi(params: any) {
  return http.request({
    url: '/permissions',
    method: 'get',
    params,
  });
}
