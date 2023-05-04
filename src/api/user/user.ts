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
export function getUsers() {
  return http.request({
    url: '/users',
    method: 'get',
  });
}
/**
 * @description: Get single user
 */
export function getUser(userId: any) {
  return http.request({
    url: `/users/${userId}`,
    method: 'get',
  });
}

/**
 * @description: create new user
 */
export function createUser(params: any) {
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
export function updateUser(userId: any, params: any) {
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
export function deleteUser(userId: any) {
  return http.request<BasicResponseModel>({
    url: `/users/${userId}`,
    method: 'DELETE',
  });
}
