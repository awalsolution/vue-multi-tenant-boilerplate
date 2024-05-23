<template>
  <div class="console">
    <div class="mb-5">
      <n-grid cols="1 s:2 m:3 l:8 xl:8 2xl:8" responsive="screen" :x-gap="16" :y-gap="8">
        <n-grid-item v-for="(item, index) in iconList" :key="index">
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
    <div>
      <button @click="handleClickTenant1">Tenant 01</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {
  UsergroupAddOutlined,
  BarChartOutlined,
  ShoppingCartOutlined,
  AccountBookOutlined,
  CreditCardOutlined,
  MailOutlined,
  TagsOutlined,
  SettingOutlined
} from '@vicons/antd';
import { getRecordApi } from '@src/api/endpoints';

const loading = ref(true);
const visits: any = ref({});
const saleroom: any = ref({});
const orderLarge: any = ref({});
const volume: any = ref({});

const handleClickTenant1 = () => {
  getRecordApi('/users');
};

function getRandomFloat(
  min?: any,
  max?: any,
  decimals?: any,
  minDecimals?: any,
  maxDecimals?: any
) {
  const randomFraction = Math.random();
  const range = max - min;
  const randomValue = min + randomFraction * range;
  const randomDecimals = Math.floor(Math.random() * (maxDecimals - minDecimals + 1) + minDecimals);
  return parseFloat(randomValue.toFixed(randomDecimals));
}

onMounted(async () => {
  visits.value = {
    dayVisits: getRandomFloat(10000, 99999, 2, 2),
    rise: getRandomFloat(10, 99, 2, 2),
    decline: getRandomFloat(10, 99, 2, 2),
    amount: getRandomFloat(99999, 999999, 3, 5)
  };
  saleroom.value = {
    weekSaleroom: Math.round(Math.random() * (99999 - 10000) + 10000 * 100),
    amount: Math.round(Math.random() * (99999 - 10000) + 10000 * 100),
    degree: Math.random() * (99 - 10) + 10
  };
  orderLarge.value = {
    weekLarge: getRandomFloat(10000, 99999, 2),
    rise: getRandomFloat(10, 99, 2),
    decline: getRandomFloat(10, 99, 2),
    amount: getRandomFloat(99999, 999999, 2)
  };
  volume.value = {
    weekLarge: getRandomFloat(10000, 99999, 2),
    rise: getRandomFloat(10, 99, 2),
    decline: getRandomFloat(10, 99, 2),
    amount: getRandomFloat(99999, 999999, 2)
  };
  loading.value = false;
});

// icon list
const iconList = [
  {
    icon: UsergroupAddOutlined,
    size: '32',
    title: 'User',
    data: 100,
    color: '#69c0ff',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: BarChartOutlined,
    size: '32',
    title: 'Analysis',
    color: '#69c0ff',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: ShoppingCartOutlined,
    size: '32',
    title: 'Product',
    color: '#ff9c6e',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: AccountBookOutlined,
    size: '32',
    title: 'Order',
    color: '#b37feb',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: CreditCardOutlined,
    size: '32',
    title: 'Bill',
    color: '#ffd666',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: MailOutlined,
    size: '32',
    title: 'Message',
    color: '#5cdbd3',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: TagsOutlined,
    size: '32',
    title: 'label',
    color: '#ff85c0',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: SettingOutlined,
    size: '32',
    title: 'Configuration',
    color: '#ffc069',
    eventObject: {
      click: () => {}
    }
  }
];
</script>

<style lang="scss" scoped></style>
