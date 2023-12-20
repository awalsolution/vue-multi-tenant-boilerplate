import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function usefilterWarehouse() {
  const warehouse: any = ref([]);
  const warehouseLoading = ref(false);
  const warehouseInitialized = ref(false);

  async function findWarehouse(query: any) {
    if (isEmpty(query)) {
      warehouse.value = [];
    } else {
      warehouseLoading.value = true;
      const response: any = await getRecordsApi('/warehouse', { name: query });
      warehouse.value = response.result;
      warehouseLoading.value = false;
    }
  }

  async function getWarehouse() {
    warehouseLoading.value = true;
    const response: any = await getRecordsApi('/warehouse');
    warehouse.value = response.result;
    warehouseLoading.value = false;
  }

  async function getWarehouseOnFocus() {
    if (!warehouseInitialized.value) {
      await getWarehouse();
      warehouseInitialized.value = true;
    }
  }

  return {
    warehouse,
    warehouseLoading,
    warehouseInitialized,
    findWarehouse,
    getWarehouse,
    getWarehouseOnFocus
  };
}
