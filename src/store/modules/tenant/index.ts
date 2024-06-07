import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useTenantStore = defineStore('app-tenant', () => {
  const tenant: Ref = ref({});

  const hasDB = () => tenant.value.db_name;

  const setTenant = (newTenant: object) => {
    tenant.value = newTenant;
  };

  console.log(tenant);

  return {
    hasDB,
    setTenant
  };
});
