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
    <n-grid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item>
        <NCard
          title="Visits"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="success">Day</n-tag>
          </template>
          <div class="flex justify-between px-1 py-1">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else :startVal="1" :endVal="visits.dayVisits" class="text-3xl" />
          </div>
          <div class="flex justify-between px-1 py-1">
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                Year-on-year
                <CountTo :startVal="1" suffix="%" :endVal="visits.rise" />
                <n-icon size="12" color="#00ff6f">
                  <CaretUpOutlined />
                </n-icon>
              </template>
            </div>
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                Weekly year-on-year
                <CountTo :startVal="1" suffix="%" :endVal="visits.decline" />
                <n-icon size="12" color="#ffde66">
                  <CaretDownOutlined />
                </n-icon>
              </template>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <n-skeleton v-if="loading" text :repeat="2" />
              <template v-else>
                <div class="text-sn">Total visits:</div>
                <div class="text-sn">
                  <CountTo :startVal="1" :endVal="visits.amount" />
                </div>
              </template>
            </div>
          </template>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard
          title="Sales"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="info">Week</n-tag>
          </template>
          <div class="flex justify-between px-1 py-1">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo
              v-else
              prefix="￥"
              :startVal="1"
              :endVal="saleroom.weekSaleroom"
              class="text-3xl"
            />
          </div>
          <div class="flex justify-between px-2 py-2">
            <div class="flex-1 text-sn">
              <n-progress
                type="line"
                :percentage="saleroom.degree"
                :indicator-placement="'inside'"
                processing
              />
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                <div class="text-sn">Total sales:</div>
                <div class="text-sn">
                  <CountTo prefix="￥" :startVal="1" :endVal="saleroom.amount" />
                </div>
              </template>
            </div>
          </template>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard
          title="Order volume"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="warning">Week</n-tag>
          </template>
          <div class="flex justify-between px-1 py-1">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else :startVal="1" :endVal="orderLarge.weekLarge" class="text-3xl" />
          </div>
          <div class="flex justify-between px-1 py-1">
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                Year-on-year
                <CountTo :startVal="1" suffix="%" :endVal="orderLarge.rise" />
                <n-icon size="12" color="#00ff6f">
                  <CaretUpOutlined />
                </n-icon>
              </template>
            </div>
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                Weekly year-on-year
                <CountTo :startVal="1" suffix="%" :endVal="orderLarge.rise" />
                <n-icon size="12" color="#ffde66">
                  <CaretDownOutlined />
                </n-icon>
              </template>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                <div class="text-sn">Conversion rate:</div>
                <div class="text-sn">
                  <CountTo :startVal="1" suffix="%" :endVal="orderLarge.amount" />
                </div>
              </template>
            </div>
          </template>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard
          title="Transaction Volume"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="error">Month</n-tag>
          </template>
          <div class="flex justify-between px-1 py-1">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else prefix="￥" :startVal="1" :endVal="volume.weekLarge" class="text-3xl" />
          </div>
          <div class="flex justify-between px-1 py-1">
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                YoY
                <CountTo :startVal="1" suffix="%" :endVal="volume.rise" />
                <n-icon size="12" color="#00ff6f">
                  <CaretUpOutlined />
                </n-icon>
              </template>
            </div>
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                YoY
                <CountTo :startVal="1" suffix="%" :endVal="volume.decline" />
                <n-icon size="12" color="#ffde66">
                  <CaretDownOutlined />
                </n-icon>
              </template>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                <div class="text-sn">Total transaction volume:</div>
                <div class="text-sn">
                  <CountTo prefix="￥" :startVal="1" :endVal="volume.amount" />
                </div>
              </template>
            </div>
          </template>
        </NCard>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {
  CaretUpOutlined,
  CaretDownOutlined,
  UsergroupAddOutlined,
  BarChartOutlined,
  ShoppingCartOutlined,
  AccountBookOutlined,
  CreditCardOutlined,
  MailOutlined,
  TagsOutlined,
  SettingOutlined
} from '@vicons/antd';
import CountTo from '@src/components/CountTo/Index.vue';

const loading = ref(true);
const visits: any = ref({});
const saleroom: any = ref({});
const orderLarge: any = ref({});
const volume: any = ref({});

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
