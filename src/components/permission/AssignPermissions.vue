<template>
  <n-space :vertical="true">
    <n-card title="Permissions List">
      <template #header-extra>
        <NButton secondary type="info" size="medium" @click="handleAssignPermissions">
          Assign Permission
        </NButton>
      </template>
      <n-checkbox-group class="mx-2" v-model:value="selectedPermissions">
        <n-row>
          <n-col v-for="permission of permissions" :key="permission.id" :span="7">
            <n-checkbox :value="permission.id" :label="permission.name" class="pb-1" />
            <n-tag size="small" :type="permission.type === 'private' ? 'error' : 'success'">
              {{ permission.type }}
            </n-tag>
          </n-col>
        </n-row>
      </n-checkbox-group>
    </n-card>
  </n-space>
  <!-- <ContentLayout>
    <template #contentHeader>
      <NCard embedded class="mb-2 px-3 py-2" :content-style="{ padding: 0 }">
        <div class="flex flex-col items-center sm:flex-row sm:justify-between">
          <h3 class="text-lg">Permissions List</h3>
          <NButton secondary type="info" size="medium" @click="handleAssignPermissions">
            Assign Permission
          </NButton>
        </div>
      </NCard>
    </template>
     <n-tabs
      type="card"
      size="medium"
      default-value="Dashboard"
      pane-class="border-x border-b overflow-scroll h-full"
      class="sticky top-0 h-full overflow-scroll"
    >
      <n-tab-pane v-for="item of menus" :key="item.id" :name="item.menu_name" :tab="item.menu_name">
        <n-checkbox-group class="mx-2" v-model:value="selectedPermissions">
          <n-row>
            <n-col v-for="permission of item.permissions" :key="permission.id" :span="7">
              <n-checkbox :value="permission.id" :label="permission.name" class="pb-1" />
              <n-tag size="small" :type="permission.type === 'private' ? 'error' : 'success'">
                {{ permission.type }}
              </n-tag>
            </n-col>
          </n-row>
        </n-checkbox-group>
      </n-tab-pane>
    </n-tabs> 
  </ContentLayout> -->
</template>
<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usefilterPermission } from '@src/filters/permissions';
// import { usefilterMenu } from '@src/filters/menus';
// import ContentLayout from '@src/layouts/ContentLayout/index.vue';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';

// const { menus, getMenus } = usefilterMenu();
const { permissions, getPermissions } = usefilterPermission();
const route = useRoute();
const router = useRouter();
const userData: Ref = ref({});
const selectedPermissions: Ref = ref([]);
const fetchEndpoint: Ref = ref();
const updateEndpoint: Ref = ref();

onMounted(() => {
  if (route.query && (route.query.roleId || route.query.userId)) {
    getPermissions();
    if (route.query.roleId) {
      fetchEndpoint.value = `/role/${route.query.roleId}`;
      updateEndpoint.value = '/role/assign-permission/' + route.query.roleId;
    } else if (route.query.userId) {
      fetchEndpoint.value = `/user/${route.query.userId}`;
      updateEndpoint.value = '/user/assign-permission/' + route.query.userId;
    }
    getRecordApi(fetchEndpoint.value).then((res: any) => {
      userData.value = res.data;
      selectedPermissions.value = res.data.permissions.map((item: any) => {
        return item.id;
      });
      window['$message'].success(res.message);
    });
  } else {
    router.replace({ name: 'ErrorPageSon' });
  }
});

const handleAssignPermissions = () => {
  updateRecordApi(updateEndpoint.value, {
    permissions: selectedPermissions.value
  }).then((res: any) => {
    window['$message'].success(res.message);
  });
};
</script>
<style lang="scss"></style>
