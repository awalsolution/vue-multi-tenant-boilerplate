import axios from 'axios';
import Request from '@/api/axios';
import { useEnv } from '@/hooks/useEnv';
import { TENANT_API_KEY } from '@/utils/storage/variables';
import { storage } from '@/utils/storage';

const { apiUrl } = useEnv();

export const loginApi = (data: any) => {
  return Request.post('/auth/login', { ...data });
};

export const getUserInfoApi = () => {
  return Request.get('/auth/authenticated');
};

export const verifyDomainNameApi = async (domain: string) => {
  try {
    const result = await axios.get(`${apiUrl}/api/v1/verify-domain/${domain}`);
    return result?.data;
  } catch (error: any) {
    const { response } = error;
    const { data, status } = response || {};
    if (status === 404 || status === 400) {
      window.toast('error', 'Error Message', data.message);
    }
    storage.remove(TENANT_API_KEY);
  }
};
