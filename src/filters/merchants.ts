import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function usefilterMerchant() {
  const merchants: any = ref([]);
  const merchantLoading = ref(false);
  const merchantsInitialized = ref(false);

  async function findMerchant(query: any) {
    if (isEmpty(query)) {
      merchants.value = [];
    } else {
      merchantLoading.value = true;
      const response: any = await getRecordsApi('/merchants', { name: query });
      merchants.value = response.result;
      merchantLoading.value = false;
    }
  }

  async function getMerchants() {
    merchantLoading.value = true;
    const response: any = await getRecordsApi('/merchants');
    merchants.value = response.result;
    merchantLoading.value = false;
  }

  async function getMerchantsOnFocus() {
    if (!merchantsInitialized.value) {
      await getMerchants();
      merchantsInitialized.value = true;
    }
  }

  return {
    merchants,
    merchantLoading,
    merchantsInitialized,
    findMerchant,
    getMerchants,
    getMerchantsOnFocus
  };
}
