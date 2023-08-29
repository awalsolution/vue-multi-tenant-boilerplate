<template>
  <ContentLayout>
    <n-tabs
      type="card"
      size="medium"
      v-model:currentValue="currentTab"
      @update:value="handleTabChange"
      :pane-style="{ paddingTop: 0, overflow: 'scroll' }"
      class="sticky top-0 h-full"
    >
      <n-tab-pane name="general" tab="General">
        <ProductGeneralInfo v-if="productDataLoaded" :product="product" />
      </n-tab-pane>
      <n-tab-pane name="variants" tab="Variants">
        <ProductVariants v-if="variantDataLoaded" :variants="variants" />
      </n-tab-pane>
    </n-tabs>
  </ContentLayout>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useMessage } from 'naive-ui';
  import { getRecordApi } from '@src/api/endpoints';
  import ContentLayout from '@src/layouts/ContentLayout/index.vue';
  import ProductGeneralInfo from '@src/components/products/components/ProductGeneralInfo.vue';
  import ProductVariants from '@src/components/products/components/ProductVariants.vue';

  const route = useRoute();
  const product: any = ref({});
  const productDataLoaded = ref(false);
  const message: any = useMessage();
  const currentTab = ref('general');
  const variants: any = ref({
    images: [],
  });
  const variantDataLoaded = ref(false);

  getRecordApi(`/products/${route.params.id}`).then((res: any) => {
    product.value = res.result;
    productDataLoaded.value = true;
  });

  const handleTabChange = (value: string) => {
    if (value === 'variants') {
      getRecordApi(`/variants/getVariantsByProduct/${route.params.id}`).then((res: any) => {
        variants.value = res.result;
        variantDataLoaded.value = true;
        message.success(res.message);
      });
    }
  };
</script>

<style lang="less" scoped></style>
