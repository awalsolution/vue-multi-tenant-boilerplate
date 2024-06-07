<template>
  <div class="mb-5">
    <n-space :vertical="true">
      <n-card title="Assign permission to admin role">
        <template #header-extra>
          <NButton secondary type="info" size="medium" @click="handleAssignPermissions">
            Assign Permission
          </NButton>
        </template>
        <n-checkbox-group class="mx-2" v-model:value="selectedPermissions">
          <n-row>
            <n-col v-for="permission of permissionList" :key="permission.id" :span="7">
              <n-checkbox :value="permission.id" :label="permission.name" class="pb-1" />
              <!-- <n-tag size="small" :type="permission.type === 'private' ? 'error' : 'success'">
                {{ permission.type }}
              </n-tag> -->
            </n-col>
          </n-row>
        </n-checkbox-group>
      </n-card>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getRecordsApi, updateRecordApi } from '@src/api/endpoints';

const route = useRoute();
const router = useRouter();
const permissionList: Ref = ref([]);
const selectedPermissions: Ref = ref([]);

onMounted(() => {
  if (route.query && (route.query.roleId || route.query.dbName)) {
    getRecordsApi(`/tenant/all-permission/${route.query.dbName}`).then((res: any) => {
      permissionList.value = res.data;
      console.log(res.data);
      selectedPermissions.value = res.data?.map((item: any) => {
        return item.id;
      });
      window['$message'].success(res.message);
    });
  } else {
    router.replace({ name: 'ErrorPageSon' });
  }
});

const handleAssignPermissions = () => {
  updateRecordApi(`/assign-permission/${route.query.roleId}`, {
    db_name: route.query.dbName,
    permissions: selectedPermissions.value
  }).then((res: any) => {
    window['$message'].success(res.message);
  });
};
</script>

<style lang="scss" scoped></style>
