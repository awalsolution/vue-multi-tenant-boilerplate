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
export function getUsersApi(params: any) {
  return http.request({
    url: '/users',
    method: 'get',
    params,
  });
}

/**
 * @description: update user status
 */
export function updateUserStatusApi(id: number, params: any) {
  return http.request<BasicResponseModel>(
    {
      url: `/users/status/${id}`,
      method: 'PUT',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: update user profile
 */
export function profileUpdateApi(id: number, params: any) {
  return http.request<BasicResponseModel>(
    {
      url: `/users/profile/${id}`,
      method: 'PUT',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
