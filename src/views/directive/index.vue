<template>
  <div class="card content-box">
    <n-card :bordered="false" title="Copy instruction">
      <n-space>
        <n-input placeholder="Try input content" v-model:value="data" style="width: 350px" />
        <n-button v-copy="data" type="primary" @click="a">Copy</n-button>
      </n-space>
    </n-card>
    <n-card :bordered="false" title="Anti-Shake Command" class="mt-3">
      <n-button type="primary" v-debounce="b">Anti-shake test</n-button>
    </n-card>
    <n-card :bordered="false" title="throttle instruction" class="mt-3">
      <n-button type="primary" v-throttle="c">throttling test</n-button>
    </n-card>

    <n-card :bordered="false" title="drag command" class="mt-3">
      Put the mouse on the rectangle and drag it to try
    </n-card>
    <div class="box" v-draggable> </div>
  </div>
</template>

<script setup lang="ts" name="copyDirect">
  import { ref } from 'vue';
  import { useMessage } from 'naive-ui';
  const data = ref<string>();
  const message = useMessage();
  const a = () => {
    message.success('Copy successfully:' + data.value);
  };
  const b = () => {
    message.success('anti-shake');
    console.log(data.value);
  };
  const c = () => {
    message.success('throttling');
    console.log(data.value);
  };
</script>

<style scoped lang="less">
  body {
    width: 100px;
    height: 100px;
    background-color: #ccc;
    position: relative;
  }
  .content-box {
    height: 100vh;
    .box {
      width: 100px;
      height: 100px;
      background-color: #2d8cf0;
      position: absolute;
      z-index: 10000000;
      border-radius: 10px;
      margin: 20px 5px;
    }
  }
</style>
