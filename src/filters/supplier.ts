import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function usefilterSupplier() {
  const supplier: any = ref([]);
  const supplierLoading = ref(false);
  const supplierInitialized = ref(false);

  async function findSupplier(query: any) {
    if (isEmpty(query)) {
      supplier.value = [];
    } else {
      supplierLoading.value = true;
      const response: any = await getRecordsApi('/supplier', { name: query });
      supplier.value = response.result;
      supplierLoading.value = false;
    }
  }

  async function getSupplier() {
    supplierLoading.value = true;
    const response: any = await getRecordsApi('/supplier');
    supplier.value = response.result;
    supplierLoading.value = false;
  }

  async function getSupplierOnFocus() {
    if (!supplierInitialized.value) {
      await getSupplier();
      supplierInitialized.value = true;
    }
  }

  return {
    supplier,
    supplierLoading,
    supplierInitialized,
    findSupplier,
    getSupplier,
    getSupplierOnFocus
  };
}
