import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';

export const useList = (endpoint: any, params: any) => {
  const datalist = ref([]);
  const metaData = ref();
  const page = ref(1);
  const pageSize = ref(10);
  console.log(endpoint);
  getRecordsApi(endpoint, { params, page: page.value, pageSize: pageSize.value }).then(
    (res: any) => {
      datalist.value = res?.result?.data;
      metaData.value = res?.result?.meta;
      console.log('record list => ', res.result);
    }
  );

  return { datalist, metaData };
};
