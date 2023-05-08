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
 * @description: Get user list
 */
export function getUsersApi() {
  return http.request({
    url: '/users',
    method: 'get',
  });
}
/**
 * @description: Get single user
 */
export function getUserApi(userId: number) {
  return http.request({
    url: `/users/${userId}`,
    method: 'get',
  });
}

/**
 * @description: create new user
 */
export function createUserApi(params: any) {
  return http.request<BasicResponseModel>(
    {
      url: '/users',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: update user
 */
export function updateUserApi(userId: number, params: any) {
  return http.request<BasicResponseModel>(
    {
      url: `/users/${userId}`,
      method: 'PUT',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: delete user
 */
export function deleteUserApi(userId: number) {
  return http.request<BasicResponseModel>({
    url: `/users/${userId}`,
    method: 'DELETE',
  });
}
