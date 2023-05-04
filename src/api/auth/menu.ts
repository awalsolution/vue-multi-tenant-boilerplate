import { http } from '@/utils/http/axios';

/**
 * @description: Get user menu according to user id
 */
export function adminMenus() {
  return http.request({
    url: '/menus',
    method: 'GET',
  });
}

/**
 * Get tree menu list
 * @param params
 */
export function getMenuList(params?: any) {
  return http.request({
    url: '/menu/list',
    method: 'GET',
    params,
  });
}
