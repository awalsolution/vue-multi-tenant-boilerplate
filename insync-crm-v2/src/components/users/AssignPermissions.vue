<template>
  <ContentLayout>
    <div class="flex justify-between items-center pb-3">
      <h3 class="text-lg">Permissions List</h3>
      <NButton size="small" @click="handleAssignPermissions"> Assign Permission </NButton>
    </div>
    <n-tabs
      type="card"
      size="medium"
      :pane-style="{ paddingTop: 0, overflow: 'scroll' }"
      class="sticky top-0 h-full"
    >
      <n-tab-pane v-for="item of menus" :key="item.id" :name="item.menu_name" :tab="item.menu_name">
        <n-checkbox-group v-model:value="selectedPermissions">
          <n-row class="pt-3">
            <n-col v-for="permission of item.permissions" :key="permission.id" :span="6">
              <n-checkbox :value="permission.id" :label="permission.name" />
            </n-col>
          </n-row>
        </n-checkbox-group>
      </n-tab-pane>
    </n-tabs>
  </ContentLayout>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useMessage } from 'naive-ui';
  import { filterMenu } from '@src/filters/menus';
  import ContentLayout from '@src/layouts/ContentLayout/index.vue';
  import { getRecordApi, updateRecordApi } from '@src/api/endpoints';

  const { menus, getMenus } = filterMenu();
  const route = useRoute();
  const userData = ref({});
  const message: any = useMessage();
  const selectedPermissions = ref([]);

  onMounted(() => {
    getMenus();
    getRecordApi(`/users/${route.params.id}`).then((res: any) => {
      userData.value = res.result;
      selectedPermissions.value = res.result.permissions.map((item: any) => {
        return item.id;
      });
    });
  });

  const handleAssignPermissions = () => {
    updateRecordApi(`/users/assign-permission/${route.params.id}`, {
      permissions: selectedPermissions.value,
    }).then((res: any) => {
      message.success(res.message);
    });
  };
</script>
<style lang="css"></style>
