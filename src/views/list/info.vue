<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Basic details">
        Border details, sometimes used to display read-only information.
      </n-card>
    </div>
    <n-card :bordered="false" class="proCard mt-4" size="small" :segmented="{ content: true }">
      <n-descriptions label-placement="left" class="py-2">
        <n-descriptions-item>
          <template #label>Payee Name</template>
          Ah Jun
        </n-descriptions-item>
        <n-descriptions-item label="Receiving account">NaiveUiAdmin@qq.com</n-descriptions-item>
        <n-descriptions-item label="Payment Type">Alipay</n-descriptions-item>
        <n-descriptions-item label="Payment Account">NaiveUiAdmin@163.com</n-descriptions-item>
        <n-descriptions-item label="transfer amount">￥1980.00</n-descriptions-item>
        <n-descriptions-item label="status">
          <n-tag type="success"> Arrived</n-tag>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    setup() {
      return {};
    },
  });
</script>

<style lang="less" scoped></style>
