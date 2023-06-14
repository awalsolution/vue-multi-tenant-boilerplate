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
 * @description: Get product list
 */
export function getProductsApi(params: any) {
  return http.request({
    url: '/products',
    method: 'get',
    params,
  });
}
