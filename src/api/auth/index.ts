import Request from '@src/api/axios';

export const loginApi = (data: any) => {
  return Request.post('/login', { ...data });
};

export const getCurrentUserApi = () => {
  return Request.get('/authenticated');
};
