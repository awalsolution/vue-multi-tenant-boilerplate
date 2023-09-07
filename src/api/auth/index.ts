import Request from '@src/api/axios';
import { BaseResponse } from '@src/types/request';
export class AuthAPI {
  static loginApi(data: any) {
    return Request.post('/auth/login', { ...data });
  }

  static getUserInfoApi() {
    return Request.get('/users/authenticated');
  }
}

export const loginApi = (data: any) => {
  return Request.post<BaseResponse<any>>('/auth/login', { ...data });
};

export const getUserInfoApi = () => {
  return Request.get<BaseResponse<any>>('/users/authenticated');
};
