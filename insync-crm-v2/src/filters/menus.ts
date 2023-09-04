import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function filterMenu() {
  const menus: any = ref([]);
  const menuLoading = ref(false);
  const menusInitialized = ref(false);

  async function findMenu(query: any) {
    if (isEmpty(query)) {
      menus.value = [];
    } else {
      menuLoading.value = true;
      const response: any = await getRecordsApi('/menus/parent', { name: query, pageSize: 1000 });
      menus.value = response.result.data;
      menuLoading.value = false;
    }
  }

  async function getMenus() {
    menuLoading.value = true;
    const response: any = await getRecordsApi('/menus/parent');
    menus.value = response.result.data;
    menuLoading.value = false;
  }

  async function getMenusOnFocus() {
    if (!menusInitialized.value) {
      await getMenus();
      menusInitialized.value = true;
    }
  }

  return {
    menus,
    menuLoading,
    menusInitialized,
    findMenu,
    getMenus,
    getMenusOnFocus,
  };
}
