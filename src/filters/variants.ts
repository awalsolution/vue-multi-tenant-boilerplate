import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function usefilterVariant() {
  const variants: any = ref([]);
  const variantLoading = ref(false);
  const variantsInitialized = ref(false);

  async function findVariant(query: any) {
    if (isEmpty(query)) {
      variants.value = [];
    } else {
      variantLoading.value = true;
      const response: any = await getRecordsApi('/variants', { name: query });
      variants.value = response.result;
      variantLoading.value = false;
    }
  }

  async function getVariants() {
    variantLoading.value = true;
    const response: any = await getRecordsApi('/variants');
    variants.value = response.result;
    variantLoading.value = false;
  }

  async function getVariantsOnFocus() {
    if (!variantsInitialized.value) {
      await getVariants();
      variantsInitialized.value = true;
    }
  }

  return {
    variants,
    variantLoading,
    variantsInitialized,
    findVariant,
    getVariants,
    getVariantsOnFocus
  };
}
