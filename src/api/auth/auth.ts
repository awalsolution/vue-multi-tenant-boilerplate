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
 * @description: Get user information
 */
export function getUserInfo() {
  return http.request({
    url: '/users/authenticated',
    method: 'get',
  });
}

/**
 * @description: User login
 */
export function login(params: any) {
  return http.request<BasicResponseModel>(
    {
      url: '/auth/login',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: User register
 */
export function register(params: any) {
  return http.request<BasicResponseModel>(
    {
      url: '/auth/register',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: user logout
 */
export function logout(params: any) {
  return http.request({
    url: '/auth/logout',
    method: 'POST',
    params,
  });
}

/**
 * @description: user change password
 */
export function changePassword(params: any, uid: any) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
