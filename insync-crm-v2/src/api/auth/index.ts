import Request from '@src/api/axios';

export class AuthAPI {
  static loginApi(data: any) {
    return Request.post('/auth/login', { ...data });
  }

  static getUserInfoApi() {
    return Request.get('/users/authenticated');
  }
}
