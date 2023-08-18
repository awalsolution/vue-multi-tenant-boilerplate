import type { BaseResponse } from '@src/types/request';
import Request from '@src/api/axios';
import type { LoginModel, UserTokenResponse } from './types';
import { useEnv } from '@src/hooks/useEnv';

const { apiPrefix } = useEnv();

export class AuthAPI {
  private static PREFIX = `${apiPrefix}/auth`;

  static login(data: LoginModel) {
    return Request.post<BaseResponse<UserTokenResponse>>(
      `${this.PREFIX}/login`,
      { ...data }
    );
  }
}
