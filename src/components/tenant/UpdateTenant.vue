<template>
  <Card>
    <template #title>
      <h1 class="text-2xl">Edit Organization</h1>
    </template>
    <template #content>
      <Tabs value="0">
        <TabList>
          <Tab v-for="tab in tabs" :key="tab.title.key" :value="tab.value">
            {{ tab.title.label }}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-for="tab in tabs" :key="tab.content.key" :value="tab.value">
            <p class="m-0">{{ tab.content.data }}</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Card from 'primevue/card';

const tabs: Ref = ref([
  {
    title: { label: 'General Info', key: 'general_info' },
    content: { key: 'general_info', data: 'Tab 1 Content' },
    value: '0'
  },
  {
    title: { label: 'Permissions', key: 'permissions' },
    content: { key: 'permissions', data: 'Tab 2 Content' },
    value: '1'
  },
  {
    title: { label: 'Roles', key: 'roles' },
    content: { key: 'roles', data: 'Tab 3 Content' },
    value: '2'
  },
  {
    title: { label: 'Users', key: 'users' },
    content: { key: 'users', data: 'Tab 4 Content' },
    value: '3'
  }
]);
</script>

<style lang="scss" scoped></style>
