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
 * @description: Get permission list
 */
export function getPermissionsApi() {
  return http.request({
    url: '/permissions',
    method: 'get',
  });
}
/**
 * @description: Get single permission
 */
export function getPermissionApi(permissionId: number) {
  return http.request({
    url: `/permissions/${permissionId}`,
    method: 'get',
  });
}

/**
 * @description: create new permission
 */
export function createPermissionApi(params: any) {
  return http.request<BasicResponseModel>(
    {
      url: '/permissions',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: update permission
 */
export function updatePermissionApi(permissionId: number, params: any) {
  return http.request<BasicResponseModel>(
    {
      url: `/permissions/${permissionId}`,
      method: 'PUT',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: delete permission
 */
export function deletePermissionApi(permissionId: number) {
  return http.request<BasicResponseModel>({
    url: `/permissions/${permissionId}`,
    method: 'DELETE',
  });
}
