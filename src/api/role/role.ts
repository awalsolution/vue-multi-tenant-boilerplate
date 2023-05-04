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
 * @description: Get role list
 */
export function getRoles() {
  return http.request({
    url: '/roles',
    method: 'get',
  });
}
/**
 * @description: Get single role
 */
export function getRole(roleId: any) {
  return http.request({
    url: `/roles/${roleId}`,
    method: 'get',
  });
}

/**
 * @description: create new role
 */
export function createRole(params: any) {
  return http.request<BasicResponseModel>(
    {
      url: '/roles',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: update role
 */
export function updateRole(roleId: any, params: any) {
  return http.request<BasicResponseModel>(
    {
      url: `/roles/${roleId}`,
      method: 'PUT',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: delete role
 */
export function deleteRole(roleId: any) {
  return http.request<BasicResponseModel>({
    url: `/roles/${roleId}`,
    method: 'DELETE',
  });
}
