import Request from '@src/api/axios';

export const getRecordsApi = (endpoint: any, params?: any) => {
  return Request.get(endpoint, {
    ...params
  });
};

export const getRecordApi = (endpoint: any, params?: any) => {
  return Request.get(endpoint, params);
};

export const createRecordApi = (endpoint: any, data: any) => {
  return Request.post(endpoint, { ...data });
};

export const updateRecordApi = (endpoint: any, data: any) => {
  return Request.put(endpoint, {
    ...data
  });
};

export const deleteRecordApi = (endpoint: any, params?: any) => {
  return Request.delete(endpoint, params);
};
