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
export function getShops() {
  return http.request({
    url: '/shops',
    method: 'get',
  });
}
/**
 * @description: Get single shop
 */
export function getShop(shopId: any) {
  return http.request({
    url: `/shops/${shopId}`,
    method: 'get',
  });
}

/**
 * @description: create new shop
 */
export function createShop(params: any) {
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
export function updateShop(shopId: any, params: any) {
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
export function deleteShop(shopId: any) {
  return http.request<BasicResponseModel>({
    url: `/shops/${shopId}`,
    method: 'DELETE',
  });
}
