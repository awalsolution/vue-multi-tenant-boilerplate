<template>
  <div class="mb-5">
    <n-grid cols="1 s:2 m:3 l:8 xl:8 2xl:8" responsive="screen" :x-gap="16" :y-gap="8">
      <n-grid-item v-for="(item, index) in dataList" :key="index">
        <NCard content-style="padding-top: 0;" size="small" :bordered="false">
          <template #footer>
            <n-skeleton v-if="loading" size="medium" />
            <div class="cursor-pointer" v-else>
              <p class="flex justify-center">
                <span>
                  <n-icon :size="item.size" class="flex-1" :color="item.color">
                    <component :is="item.icon" v-on="item.eventObject || {}" />
                  </n-icon>
                </span>
              </p>
              <p class="flex justify-between">
                <span>{{ item.title }}</span>
                <span>{{ item.data }}</span>
              </p>
            </div>
          </template>
        </NCard>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, onMounted } from 'vue';
import { UsergroupAddOutlined } from '@vicons/antd';
import { LockOpen16Regular, PersonLock24Regular } from '@vicons/fluent';
import { getRecordApi } from '@src/api/endpoints';
import { useRoute } from 'vue-router';

const route = useRoute();
const permissions: Ref = ref();
const users: Ref = ref();
const roles: Ref = ref();
const loading: Ref = ref(true);

onMounted(() => {
  getRecordApi(`/tenant/detail/${route.query.db_name}`).then((res: any) => {
    permissions.value = res.data?.permissions;
    users.value = res.data?.users;
    roles.value = res.data?.roles;
  });
  loading.value = false;
});

// data list
const dataList = [
  {
    icon: UsergroupAddOutlined,
    size: '32',
    title: 'Users',
    data: users,
    color: '#69c0ff',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: LockOpen16Regular,
    size: '32',
    title: 'Permissions',
    color: '#69c0ff',
    data: permissions,
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: PersonLock24Regular,
    size: '32',
    title: 'Roles',
    data: roles,
    color: '#ff9c6e',
    eventObject: {
      click: () => {}
    }
  }
];
</script>

<style lang="scss" scoped></style>
