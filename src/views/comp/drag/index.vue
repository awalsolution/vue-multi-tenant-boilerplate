<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="drag and drop">
        Commonly used for cards, matters, appointments, processes, plans, etc.,
      </n-card>
    </div>

    <n-alert title="Fancy drag and drop demo" type="info" class="mt-4">
      Each card can be dragged up and down in order. In addition, different cards can also be
      dragged over and over. It’s no problem. Try O(∩_∩)O haha~
    </n-alert>

    <n-grid
      cols="1 s:2 m:3 l:4 xl:4 2xl:4"
      class="mt-4 proCard"
      responsive="screen"
      :x-gap="12"
      :y-gap="8"
    >
      <n-grid-item>
        <NCard
          title="Demand Pool"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="info">Moon</n-tag>
          </template>

          <Draggable
            class="draggable-ul"
            animation="300"
            :list="demandList"
            group="people"
            itemKey="name"
          >
            <template #item="{ element }">
              <div class="cursor-move draggable-li">
                <n-tag type="info">Need</n-tag><span class="ml-2">{{ element.name }}</span>
              </div>
            </template>
          </Draggable>
        </NCard>
      </n-grid-item>

      <n-grid-item>
        <NCard
          title="In development"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="info">Moon</n-tag>
          </template>

          <Draggable
            class="draggable-ul"
            animation="300"
            :list="exploitList"
            group="people"
            itemKey="name"
          >
            <template #item="{ element }">
              <div class="cursor-move draggable-li">
                <n-tag type="warning">In development </n-tag
                ><span class="ml-2">{{ element.name }}</span>
              </div>
            </template>
          </Draggable>
        </NCard>
      </n-grid-item>

      <n-grid-item>
        <NCard
          title="Completed"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="info">Moon</n-tag>
          </template>
          <Draggable
            class="draggable-ul"
            animation="300"
            :list="completeList"
            group="people"
            itemKey="name"
          >
            <template #item="{ element }">
              <div class="cursor-move draggable-li">
                <n-tag type="error">Completed</n-tag><span class="ml-2">{{ element.name }}</span>
              </div>
            </template>
          </Draggable>
        </NCard>
      </n-grid-item>

      <n-grid-item>
        <NCard
          title="Accepted"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="info">月</n-tag>
          </template>
          <Draggable
            class="draggable-ul"
            animation="300"
            :list="approvedList"
            group="people"
            itemKey="name"
          >
            <template #item="{ element }">
              <div class="cursor-move draggable-li">
                <n-tag type="success">Accepted</n-tag><span class="ml-2">{{ element.name }}</span>
              </div>
            </template>
          </Draggable>
        </NCard>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import Draggable from 'vuedraggable';

  const demandList = reactive([
    {
      name: 'Reservation form page, which can fill in relevant information about the reservation',
      id: 1,
    },
    { name: 'Promotion page, including promotional advertisement display', id: 2 },
    { name: 'Product list, need an arrival reminder', id: 3 },
    { name: 'Product needs a review function', id: 4 },
    { name: 'Product pictures need to provide a magnifying glass', id: 5 },
    { name: 'The order needs to be deleted to the recycle bin', id: 6 },
    { name: 'User avatar upload, need to support cropping', id: 7 },
    { name: 'It is said that Vue3.2 has been released, when will setup support it? ', id: 8 },
  ]);

  const exploitList = reactive([
    { name: 'The product image needs to provide a magnifying glass', id: 5 },
  ]);

  const completeList = reactive([
    { name: 'The product picture needs to provide a magnifying glass', id: 5 },
  ]);

  const approvedList = reactive([
    { name: 'A magnifying glass is required for product pictures', id: 5 },
  ]);
</script>

<style lang="less" scoped>
  .draggable-ul {
    width: 100%;
    overflow: hidden;
    margin-top: -16px;

    .draggable-li {
      width: 100%;
      padding: 16px 10px;
      color: #333;
      border-bottom: 1px solid #efeff5;
    }
  }
</style>
