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
/**
 * @description: Get single product
 */
export function getProductApi(id: number | undefined) {
  return http.request({
    url: `/products/${id}`,
    method: 'get',
  });
}

/**
 * @description: create new product
 */
export function createProductApi(params: any) {
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
export function updateProductApi(id: number, params: any) {
  return http.request<BasicResponseModel>(
    {
      url: `/products/${id}`,
      method: 'PUT',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: update product status
 */
export function updateProductStatusApi(id: number, params: any) {
  return http.request<BasicResponseModel>(
    {
      url: `/products/${id}`,
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
export function deleteProductApi(id: number) {
  return http.request<BasicResponseModel>({
    url: `/products/${id}`,
    method: 'DELETE',
  });
}
