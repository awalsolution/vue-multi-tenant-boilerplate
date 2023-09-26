import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function usefilterProducts() {
  const products: any = ref([]);
  const productLoading = ref(false);
  const productsInitialized = ref(false);

  async function findProduct(query: any) {
    if (isEmpty(query)) {
      products.value = [];
    } else {
      productLoading.value = true;
      const response: any = await getRecordsApi('/products', { name: query });
      products.value = response.result;
      productLoading.value = false;
    }
  }

  async function getProducts() {
    productLoading.value = true;
    const response: any = await getRecordsApi('/products');
    products.value = response.result;
    productLoading.value = false;
  }

  async function getProductsOnFocus() {
    if (!productsInitialized.value) {
      await getProducts();
      productsInitialized.value = true;
    }
  }

  return {
    products,
    productLoading,
    productsInitialized,
    findProduct,
    getProducts,
    getProductsOnFocus
  };
}
