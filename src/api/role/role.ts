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
export function getRolesApi() {
  return http.request({
    url: '/roles',
    method: 'get',
  });
}
/**
 * @description: Get single role
 */
export function getRoleApi(roleId: number) {
  return http.request({
    url: `/roles/${roleId}`,
    method: 'get',
  });
}

/**
 * @description: create new role
 */
export function createRoleApi(params: any) {
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
export function updateRoleApi(roleId: number, params: any) {
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
export function deleteRoleApi(roleId: number) {
  return http.request<BasicResponseModel>({
    url: `/roles/${roleId}`,
    method: 'DELETE',
  });
}
