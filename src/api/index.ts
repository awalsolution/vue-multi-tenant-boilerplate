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
 * @description: Get single Record
 */
export function getRecordApi(endpoint: string) {
  return http.request({
    url: endpoint,
    method: 'get',
  });
}

/**
 * @description: create Record
 */
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
/**
 * @description: update Record
 */
export function updateRecordApi(endpoint: string, params: any) {
  return http.request<BasicResponseModel>(
    {
      url: endpoint,
      method: 'PUT',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: delete Record
 */
export async function deleteRecordApi(endpoint: string) {
  return http.request<BasicResponseModel>({
    url: endpoint,
    method: 'DELETE',
  });
}
