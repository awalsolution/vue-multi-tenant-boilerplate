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
 * @description: Get variant list
 */
export function getVariantsApi() {
  return http.request({
    url: '/variants',
    method: 'get',
  });
}

export function createRecordApi(endpoint: string, params: any) {
  return http.request<BasicResponseModel>(
    {
      url: endpoint,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
