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
 * @description: Get Attribute list
 */
export function getAttributeListApi(params: any) {
  return http.request({
    url: '/attributes',
    method: 'get',
    params,
  });
}
