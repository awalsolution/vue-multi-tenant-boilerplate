<template>
  <div>
    <n-result
      status="success"
      title="Operation successful"
      description="Estimated arrival within two hours"
      class="step-result"
    >
      <template #default>
        <div class="information">
          <n-grid cols="2 s:2 m:3 l:3 xl:3 2xl:3" responsive="screen" class="my-1">
            <n-gi>Payment account:</n-gi>
            <n-gi>NaiveUiAdmin@163.com</n-gi>
          </n-grid>
          <n-grid cols="2 s:2 m:3 l:3 xl:3 2xl:3" responsive="screen" class="my-1">
            <n-gi>Receiving account:</n-gi>
            <n-gi>xiaoma@qq.com</n-gi>
          </n-grid>
          <n-grid cols="2 s:2 m:3 l:3 xl:3 2xl:3" responsive="screen" class="my-1">
            <n-gi>Payee Name:</n-gi>
            <n-gi>Ah Jun</n-gi>
          </n-grid>
          <n-grid cols="2 s:2 m:3 l:3 xl:3 2xl:3" responsive="screen" class="my-1">
            <n-gi>Transfer amount:</n-gi>
            <n-gi>￥<span class="money">1980</span> yuan</n-gi>
          </n-grid>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-center">
          <n-button type="primary" @click="finish" class="mr-4">Return one more</n-button>
          <n-button @click="prevStep">View Bill</n-button>
        </div>
      </template>
    </n-result>
  </div>
</template>

<script lang="ts" setup>
  import { defineEmits } from 'vue';

  const emit = defineEmits(['finish', 'prevStep']);
  function prevStep() {
    emit('prevStep');
  }

  function finish() {
    emit('finish');
  }
</script>

<style lang="less" scoped>
  .step-result {
    max-width: 560px;
    margin: 40px auto 0;

    ::v-deep(.n-result-content) {
      background-color: #fafafa;
      padding: 24px 40px;
    }

    .information {
      line-height: 22px;

      .ant-row:not(:last-child) {
        margin-bottom: 24px;
      }
    }

    .money {
      font-family: 'Helvetica Neue', sans-serif;
      font-weight: 500;
      font-size: 20px;
      line-height: 14px;
    }
  }
</style>
