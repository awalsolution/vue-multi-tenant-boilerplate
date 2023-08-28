<template>
  <ContentLayout>
    <n-card title="Edit Product">
      <n-tabs type="card" size="medium">
        <n-tab-pane name="general" tab="General">
          <ProductGeneralInfo v-if="dataLoaded" :product="product" />
        </n-tab-pane>
        <n-tab-pane name="variants" tab="Variants"> All Variants Information </n-tab-pane>
      </n-tabs>
    </n-card>
  </ContentLayout>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import ContentLayout from '@src/layouts/ContentLayout/index.vue';
  import ProductGeneralInfo from '@src/components/products/components/ProductGeneralInfo.vue';
  import { getRecordApi } from '@src/api/endpoints';

  const route = useRoute();
  const product: any = ref({});
  const dataLoaded = ref(false);

  getRecordApi(`/products/${route.params.id}`).then((result) => {
    product.value = result.result;
    dataLoaded.value = true;
  });
</script>

<style lang="less" scoped>
  .bg_transparent {
    background-color: transparent;
  }
  .ql-toolbar.ql-snow {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #eee;
    margin-top: -10px;
  }
  .ql-container.ql-snow {
    border: none;
  }
  td {
    white-space: nowrap;
  }
</style>
