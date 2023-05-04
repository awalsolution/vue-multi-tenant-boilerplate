<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Workbench">
        <n-grid cols="2 s:1 m:1 l:2 xl:2 2xl:2" responsive="screen">
          <n-gi>
            <div class="flex items-center">
              <div>
                <n-avatar circle :size="64" :src="schoolboy" />
              </div>
              <div>
                <p class="px-4 text-xl">Good morning, Ah Jung, let's start your day! </p>
                <p class="px-4 text-gray-400"
                  >Today it is cloudy and rainy, 15°C - 25°C, remember to bring an umbrella when you
                  go out.
                </p>
              </div>
            </div>
          </n-gi>
          <n-gi>
            <div class="flex justify-end w-full">
              <div class="flex flex-1 flex-col justify-center text-right">
                <span class="text-secondary">Number of Items</span>
                <span class="text-2xl">16</span>
              </div>
              <div class="flex flex-1 flex-col justify-center text-right">
                <span class="text-secondary">to do</span>
                <span class="text-2xl">3/15</span>
              </div>
              <div class="flex flex-1 flex-col justify-center text-right">
                <span class="text-secondary">Message</span>
                <span class="text-2xl">35</span>
              </div>
            </div>
          </n-gi>
        </n-grid>
      </n-card>
    </div>
    <n-grid class="mt-4" cols="2 s:1 m:1 l:2 xl:2 2xl:2" responsive="screen" :x-gap="12" :y-gap="9">
      <n-gi>
        <n-card
          :segmented="{ content: true }"
          content-style="padding: 0;"
          :bordered="false"
          size="small"
          title="Project"
        >
          <div class="flex flex-wrap project-card">
            <n-card
              size="small"
              class="cursor-pointer project-card-item ms:w-1/2 md:w-1/3"
              hoverable
            >
              <div class="flex">
                <span>
                  <n-icon size="30">
                    <GithubOutlined />
                  </n-icon>
                </span>
                <span class="text-lg ml-4">Github</span>
              </div>
              <div class="flex mt-2 h-10 text-gray-400">
                is a hosting platform for open source and proprietary software projects.
              </div>
              <div class="flex mt-2 h-10 text-gray-400"> Kaiyuan Jun, 2021-07-04 </div>
            </n-card>
            <n-card
              size="small"
              class="cursor-pointer project-card-item ms:w-1/2 md:w-1/3"
              hoverable
            >
              <div class="flex">
                <span>
                  <n-icon size="30" color="#42b983">
                    <LogoVue />
                  </n-icon>
                </span>
                <span class="text-lg ml-4">Vue</span>
              </div>
              <div class="flex mt-2 h-10 text-gray-400"> Progressive JavaScript Framework </div>
              <div class="flex mt-2 h-10 text-gray-400">
                Learn even if you don’t move, 2021-07-04
              </div>
            </n-card>
            <n-card
              size="small"
              class="cursor-pointer project-card-item ms:w-1/2 md:w-1/3"
              hoverable
            >
              <div class="flex">
                <span>
                  <n-icon size="30" color="#e44c27">
                    <Html5Outlined />
                  </n-icon>
                </span>
                <span class="text-lg ml-4">Html5</span>
              </div>
              <div class="flex mt-2 h-10 text-gray-400">
                HTML5 is the next generation standard of the Internet.
              </div>
              <div class="flex mt-2 h-10 text-gray-400"> Code is also an art 2021-04-01 </div>
            </n-card>
            <n-card
              size="small"
              class="cursor-pointer project-card-item ms:w-1/2 md:w-1/3"
              hoverable
            >
              <div class="flex">
                <span>
                  <n-icon size="30" color="#dd0031">
                    <Logo Angular />
                  </n-icon>
                </span>
                <span class="text-lg ml-4">Angular</span>
              </div>
              <div class="flex mt-2 h-10 text-gray-400">
                The modern web development platform with millions of fans.
              </div>
              <div class="flex mt-2 h-10 text-gray-400"> Iron Fan Jun 2021-07-04. </div>
            </n-card>
            <n-card
              size="small"
              class="cursor-pointer project-card-item ms:w-1/2 md:w-1/3"
              hoverable
            >
              <div class="flex">
                <span>
                  <n-icon size="30" color="#61dafb">
                    <LogoReact />
                  </n-icon>
                </span>
                <span class="text-lg ml-4">React</span>
              </div>
              <div class="flex mt-2 h-10 text-gray-400">
                JavaScript library for building user interfaces.
              </div>
              <div class="flex mt-2 h-10 text-gray-400"> Tech Bull 2021-07-04. </div>
            </n-card>
            <n-card
              size="small"
              class="cursor-pointer project-card-item ms:w-1/2 md:w-1/3"
              hoverable
            >
              <div class="flex">
                <span>
                  <n-icon size="30">
                    <Logo Javascript />
                  </n-icon>
                </span>
                <span class="text-lg ml-4">Js</span>
              </div>
              <div class="flex mt-2 h-10 text-gray-400"> The road is made, not imagined. </div>
              <div class="flex mt-2 h-10 text-gray-400"> Architecture Group 2021-07-04 </div>
            </n-card>
          </div>
        </n-card>

        <n-card
          :segmented="{ content: true }"
          content-style="padding-top: 0;padding-bottom: 0;"
          :bordered="false"
          size="small"
          title="Dynamic"
          class="mt-4"
        >
          <template #header-extra><a href="javascript:;">More</a></template>
          <n-list>
            <n-list-item>
              <template #prefix>
                <n-avatar circle :size="40" :src="schoolboy" />
              </template>
              <n-thing
                title="Ah Jung wrote some casually on the workbench page just now, I can barely read it!"
              >
                <template #description
                  ><p class="text-xs text-gray-500">2021-07-04 22:37:16</p></template
                >
              </n-thing>
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-avatar circle :size="40" :src="schoolboy" />
              </template>
              <n-thing title="Ah Jung created the project naive-ui-admin in open source group?">
                <template #description
                  ><p class="text-xs text-gray-500">2021-07-04 09:37:16</p></template
                >
              </n-thing>
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-avatar circle :size="40" :src="schoolboy" />
              </template>
              <n-thing
                title="@Itjiefengqingyang, submitted a bug to naive-ui-admin, take the time to take a look!"
              >
                <template #description
                  ><p class="text-xs text-gray-500">2021-07-04 22:37:16</p></template
                >
              </n-thing>
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-avatar circle :size="40" :src="schoolboy" />
              </template>
              <n-thing
                title="The children's shoes in the technical department, warn again, don't touch fish, don't touch fish, don't touch fish!"
              >
                <template #description
                  ><p class="text-xs text-gray-500">2021-07-04 09:37:16</p></template
                >
              </n-thing>
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-avatar circle :size="40" :src="schoolboy" />
              </template>
              <n-thing
                title="Do not touch fish at work, what is the difference from salted fish (this is really not what I said)!"
              >
                <template #description
                  ><p class="text-xs text-gray-500">2021-07-04 20:37:16</p></template
                >
              </n-thing>
            </n-list-item>
            <n-list-item>
              <template #prefix>
                <n-avatar circle :size="40" :src="schoolboy" />
              </template>
              <n-thing
                title="Page switching actually supports caching, but with an excessive effect, it looks like it is re-rendered"
              >
                <template #description>
                  <p class="text-gray-400">
                    <n-input
                      type="text"
                      placeholder="If you don't believe me, try typing some text"
                    />
                  </p>
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card
          :segmented="{ content: true }"
          content-style="padding: 0;"
          :bordered="false"
          size="small"
          title="Quick Operation"
        >
          <div class="flex flex-wrap project-card">
            <n-card size="small" class="cursor-pointer project-card-item" hoverable>
              <div class="flex flex-col justify-center text-gray-500">
                <span class="text-center">
                  <n-icon size="30" color="#68c755">
                    <Dashboard Outlined />
                  </n-icon>
                </span>
                <span class="text-lx text-center">Console</span>
              </div>
            </n-card>
            <n-card size="small" class="cursor-pointer project-card-item" hoverable>
              <div class="flex flex-col justify-center text-gray-500">
                <span class="text-center">
                  <n-icon size="30" color="#fab251">
                    <ProfileOutlined />
                  </n-icon>
                </span>
                <span class="text-lx text-center">List</span>
              </div>
            </n-card>
            <n-card size="small" class="cursor-pointer project-card-item" hoverable>
              <div class="flex flex-col justify-center text-gray-500">
                <span class="text-center">
                  <n-icon size="30" color="#1890ff">
                    <FileProtectOutlined />
                  </n-icon>
                </span>
                <span class="text-lx text-center">Form</span>
              </div>
            </n-card>
            <n-card size="small" class="cursor-pointer project-card-item" hoverable>
              <div class="flex flex-col justify-center text-gray-500">
                <span class="text-center">
                  <n-icon size="30" color="#f06b96">
                    <Apartment Outlined />
                  </n-icon>
                </span>
                <span class="text-lx text-center">Rights Management</span>
              </div>
            </n-card>
            <n-card size="small" class="cursor-pointer project-card-item" hoverable>
              <div class="flex flex-col justify-center text-gray-500">
                <span class="text-center">
                  <n-icon size="30" color="#7238d1">
                    <SettingOutlined />
                  </n-icon>
                </span>
                <span class="text-lx text-center">System Administration</span>
              </div>
            </n-card>
            <n-card size="small" class="cursor-pointer project-card-item" hoverable>
              <div class="flex flex-col justify-center text-gray-500">
                <span class="text-center">
                  <n-icon size="30" color="">
                    <Dashboard Outlined />
                  </n-icon>
                </span>
                <span class="text-lx text-center">Console</span>
              </div>
            </n-card>
          </div>
        </n-card>
        <n-card :segmented="{ content: true }" :bordered="false" size="small" class="mt-4">
          <img src="~@/assets/images/Business.svg" class="w-full" />
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
  import schoolboy from '@/assets/images/schoolboy.png';
  import {
    GithubOutlined,
    ProfileOutlined,
    FileProtectOutlined,
    SettingOutlined,
    Html5Outlined,
  } from '@vicons/antd';
  import { LogoVue, LogoReact } from '@vicons/ionicons5';
</script>

<style lang="less" scoped>
  .project-card {
    margin-right: -6px;

    &-item {
      margin: -1px;
      width: 33.333333%;
    }
  }
</style>
