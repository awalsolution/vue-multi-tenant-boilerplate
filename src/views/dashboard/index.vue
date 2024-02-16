<template>
  <div class="p-5">
    <div class="mb-5">
      <n-grid cols="1 s:2 m:3 l:6 xl:6 2xl:6" responsive="screen" :x-gap="16" :y-gap="8">
        <n-grid-item v-for="(item, index) in cardList" :key="index">
          <NCard content-style="padding-top: 0;" size="small" :bordered="false">
            <template #footer>
              <n-skeleton v-if="loading" size="medium" />
              <router-link v-else :to="item.link" class="cursor-pointer">
                <p class="flex justify-center">
                  <span>
                    <n-icon :size="item.size" class="flex-1" :class="item.colorClass">
                      <component :is="item.icon" />
                    </n-icon>
                  </span>
                </p>
                <p class="flex flex-col items-center">
                  <span>{{ item.title }}</span>
                  <span class="mt-3 font-extrabold text-lg" :class="item.colorClass">
                    {{ item.data }}
                  </span>
                </p>
              </router-link>
            </template>
          </NCard>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { UsergroupAddOutlined, InfoCircleOutlined, DollarCircleOutlined } from '@vicons/antd';
import { Organization16Regular, LockClosed32Regular, PersonLock20Regular } from '@vicons/fluent';

console.log('domain name ==>', window.location.hostname);

const loading = ref(true);

onMounted(async () => {
  loading.value = false;
});

// icon list
const cardList = [
  {
    icon: UsergroupAddOutlined,
    size: '32',
    title: 'Super Admin Total Staff',
    colorClass: 'text-green-600',
    link: '/user/list',
    data: 6
  },
  {
    icon: Organization16Regular,
    size: '32',
    title: 'Total Tenants',
    colorClass: ' text-purple-600',
    link: '/tenant/list',
    data: 10
  },
  {
    icon: DollarCircleOutlined,
    size: '32',
    title: 'Total Plans',
    colorClass: 'text-blue-600',
    link: '/plan/list',
    data: 4
  },
  {
    icon: LockClosed32Regular,
    size: '32',
    title: 'Total Permissions',
    colorClass: 'text-red-600',
    link: '/permission/list',
    data: 150
  },
  {
    icon: PersonLock20Regular,
    size: '32',
    title: 'Total Roles',
    colorClass: 'text-yellow-400',
    link: '/role/list',
    data: 10
  },
  {
    icon: InfoCircleOutlined,
    size: '32',
    title: 'Total Menus',
    colorClass: 'text-fuchsia-600',
    link: '/menu/list',
    data: 5
  }
];
</script>

<style lang="scss" scoped></style>
