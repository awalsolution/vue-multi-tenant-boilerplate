import { ref } from 'vue';
import { getAttributeListApi } from '@/api/products/attributes/attribute';

/**
 * @description Paginated Data
 */
let timer: any = null;
export function useAttribute(tag = false) {
  const attributesLoading = ref(false);
  const filteredAttributes: any = ref([]);
  const filterAttributes = (query = '') => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      attributesLoading.value = true;
      getAttributeListApi({ name: query, pageSize: 1000 })
        .then((result) => {
          filteredAttributes.value = result.data;
          if (tag && query) {
            if (!filteredAttributes.value.some((role: any) => role.name === query)) {
              filteredAttributes.value.unshift({ id: 0, name: query });
            }
          }
          attributesLoading.value = false;
        })
        .catch(() => {
          attributesLoading.value = false;
        });
    }, 500);
  };
  filterAttributes();
  return { filterAttributes, filteredAttributes, attributesLoading };
}
