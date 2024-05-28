import { ref, type Ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function useMenufilter() {
  const menus: Ref = ref([]);
  const menuLoading: Ref = ref(false);
  const menusInitialized: Ref = ref(false);

  async function findMenu(query: any) {
    if (isEmpty(query)) {
      menus.value = [];
    } else {
      menuLoading.value = true;
      const response: any = await getRecordsApi('/menu', { name: query });
      menus.value = response.data;
      menuLoading.value = false;
    }
  }

  async function getMenus() {
    menuLoading.value = true;
    const response: any = await getRecordsApi('/menu');
    menus.value = response.data;
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
    getMenusOnFocus
  };
}
