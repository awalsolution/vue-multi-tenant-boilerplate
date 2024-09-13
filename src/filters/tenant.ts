import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function useTenantfilter() {
  const tenants: any = ref([]);
  const tenantLoading = ref(false);
  const tenantsInitialized = ref(false);

  async function findTenant(query: any) {
    if (isEmpty(query)) {
      tenants.value = [];
    } else {
      tenantLoading.value = true;
      const response: any = await getRecordsApi('/tenants', { name: query });
      tenants.value = response.data?.data;
      tenantLoading.value = false;
    }
  }

  async function getTenants() {
    tenantLoading.value = true;
    const response: any = await getRecordsApi('/tenants');
    tenants.value = response.data?.data;
    tenantLoading.value = false;
  }

  async function getTenantsOnFocus() {
    if (!tenantsInitialized.value) {
      await getTenants();
      tenantsInitialized.value = true;
    }
  }

  return {
    tenants,
    tenantLoading,
    tenantsInitialized,
    findTenant,
    getTenants,
    getTenantsOnFocus
  };
}
