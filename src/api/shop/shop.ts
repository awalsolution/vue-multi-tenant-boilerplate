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
/**
 * @description: Get single shop
 */
export function getShopApi(shopId: any) {
  return http.request({
    url: `/shops/${shopId}`,
    method: 'get',
  });
}

/**
 * @description: create new shop
 */
export function createShopApi(params: any) {
  return http.request<BasicResponseModel>(
    {
      url: '/shops',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: update shop
 */
export function updateShopApi(shopId: any, params: any) {
  return http.request<BasicResponseModel>(
    {
      url: `/shops/${shopId}`,
      method: 'PUT',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: delete shop
 */
export function deleteShopApi(shopId: any) {
  return http.request<BasicResponseModel>({
    url: `/shops/${shopId}`,
    method: 'DELETE',
  });
}
