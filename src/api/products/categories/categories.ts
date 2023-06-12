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
 * @description: Get Categories list
 */
export function getCategoriesListApi(params: any) {
  return http.request({
    url: '/categories',
    method: 'get',
    params,
  });
}
