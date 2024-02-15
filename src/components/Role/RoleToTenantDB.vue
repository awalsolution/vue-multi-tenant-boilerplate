<template>
  <ContentLayout>
    <template #contentHeader>
      <NCard embedded class="mb-2 px-3 py-2" :content-style="{ padding: 0 }">
        <div class="flex flex-col items-center sm:flex-row sm:justify-between">
          <h3 class="text-lg">Insert Role To Tenant DB</h3>
          <NButton secondary type="info" size="medium" @click="handleInsertRole">
            Insert Role
          </NButton>
        </div>
      </NCard>
    </template>
    <div>
      <n-checkbox-group class="mx-2" v-model:value="selectedRole">
        <n-row>
          <n-col v-for="role of roles" :key="role.id" :span="7">
            <n-checkbox :value="role.name" :label="role.name" class="pb-1" />
            <n-tag size="small" :type="role.type === 'private' ? 'error' : 'success'">
              {{ role.type }}
            </n-tag>
          </n-col>
        </n-row>
      </n-checkbox-group>
    </div>
  </ContentLayout>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRolefilter } from '@src/filters/role';
import ContentLayout from '@src/layouts/ContentLayout/index.vue';
import { createRecordApi } from '@src/api/endpoints';

const { roles, getRoles } = useRolefilter();
const route = useRoute();
const selectedRole = ref([]);

onMounted(async () => {
  if (route.query && route.query.tenant_id) {
    getRoles();
  }
});

const handleInsertRole = () => {
  const rolesData = selectedRole.value.map((name) => ({ name }));
  createRecordApi(`/role/${route.query.tenant_id}`, { roles: rolesData }).then((res: any) => {
    window['$message'].success(res.message);
  });
};
</script>
<style lang="scss"></style>
