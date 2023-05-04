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
export function getProducts() {
  return http.request({
    url: '/products',
    method: 'get',
  });
}
/**
 * @description: Get single product
 */
export function getProduct(productId: any) {
  return http.request({
    url: `/products/${productId}`,
    method: 'get',
  });
}

/**
 * @description: create new product
 */
export function createProduct(params: any) {
  return http.request<BasicResponseModel>(
    {
      url: '/products',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: update product
 */
export function updateProduct(productId: any, params: any) {
  return http.request<BasicResponseModel>(
    {
      url: `/products/${productId}`,
      method: 'PUT',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: delete product
 */
export function deleteProduct(productId: any) {
  return http.request<BasicResponseModel>({
    url: `/products/${productId}`,
    method: 'DELETE',
  });
}
