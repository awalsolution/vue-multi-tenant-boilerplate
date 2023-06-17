import { ref } from 'vue';
import { getCategoriesListApi } from '@/api/products/categories/categories';

/**
 * @description Paginated Data
 */
let timer: any = null;
export function useCategory(tag = false) {
  const categoriesLoading = ref(false);
  const filteredCategories: any = ref([]);
  const filterCategories = (query = '') => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      categoriesLoading.value = true;
      getCategoriesListApi({ name: query, pageSize: 1000 })
        .then((result: any) => {
          filteredCategories.value = result.data;
          if (tag && query) {
            if (!filteredCategories.value.some((role: any) => role.name === query)) {
              filteredCategories.value.unshift({ id: 0, name: query });
            }
          }
          categoriesLoading.value = false;
        })
        .catch(() => {
          categoriesLoading.value = false;
        });
    }, 500);
  };
  filterCategories();
  return { filterCategories, filteredCategories, categoriesLoading };
}
