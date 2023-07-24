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
 * @description: Get role list
 */
export function getRolesApi(params: any) {
  return http.request({
    url: '/roles',
    method: 'get',
    params,
  });
}
