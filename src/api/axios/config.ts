import { useEnv } from '@src/hooks/useEnv';

const { apiUrl, apiAdminPrefix, apiTenantPrefix, centralDomain } = useEnv();

export const axiosConfig = {
  baseURL:
    window.location.hostname !== centralDomain ? apiUrl + apiAdminPrefix : apiUrl + apiTenantPrefix,
  timeout: 30000,
  withCredentials: true
};
