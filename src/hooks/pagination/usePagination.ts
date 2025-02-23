import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';

interface PageEvent {
  page: number;
  first: number;
  rows: number;
  pageCount: number;
}

export function usePagination(endpoint: any) {
  const list = ref([]);
  const page = ref(1);
  const searchParams = ref({});
  const emptyState = ref(false);
  const itemCount = ref(0);
  const pageSizes = ref([10, 20, 30, 40, 50, 100]);
  const limit = ref(10);
  const getList = () => {
    getRecordsApi(endpoint, {
      ...searchParams.value,
      page: page.value,
      limit: limit.value
    }).then((res: any) => {
      console.log('record list => ', res);
      list.value = res.data.data;
      itemCount.value = res.data.meta.total;
      if (res.data.meta.total === 0) {
        emptyState.value = true;
      }
    });
  };

  const handlePageChange = (e: PageEvent) => {
    page.value = e.page + 1;
    limit.value = e.rows;
    getList();
  };

  return {
    getList,
    emptyState,
    list,
    pageSizes,
    itemCount,
    limit,
    handlePageChange,
    searchParams
  };
}
