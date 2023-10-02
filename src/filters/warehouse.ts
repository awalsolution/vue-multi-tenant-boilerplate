import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function usefilterwarehouse() {
  const warehouse: any = ref([]);
  const warehouseLoading = ref(false);
  const warehouseInitialized = ref(false);

  async function findwarehouse(query: any) {
    if (isEmpty(query)) {
      warehouse.value = [];
    } else {
      warehouseLoading.value = true;
      const response: any = await getRecordsApi('/warehouse', { name: query });
      warehouse.value = response.result;
      warehouseLoading.value = false;
    }
  }

  async function getwarehouse() {
    warehouseLoading.value = true;
    const response: any = await getRecordsApi('/warehouse');
    warehouse.value = response.result;
    warehouseLoading.value = false;
  }

  async function getwarehouseOnFocus() {
    if (!warehouseInitialized.value) {
      await getwarehouse();
      warehouseInitialized.value = true;
    }
  }

  return {
    warehouse,
    warehouseLoading,
    warehouseInitialized,
    findwarehouse,
    getwarehouse,
    getwarehouseOnFocus
  };
}
