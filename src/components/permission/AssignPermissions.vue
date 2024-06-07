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
</template>
<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePermissionfilter } from '@src/filters/permission';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';

const { permissions, getPermissions } = usePermissionfilter();
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
<style lang="scss" scoped></style>
