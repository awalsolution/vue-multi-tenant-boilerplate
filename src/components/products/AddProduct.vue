<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-form-item style="padding-top: 24px" label="Title" path="title">
      <n-input v-model:value="formValue.title" placeholder="Enter Title" />
    </n-form-item>
    <n-form-item style="padding-top: 4px" label="SKU ID" path="product_sku">
      <n-input v-model:value="formValue.product_sku" placeholder="Enter SKU ID" />
    </n-form-item>
    <n-form-item style="padding-top: 4px" label="Slug" path="slug">
      <n-input v-model:value="formValue.slug" placeholder="Enter Slug" />
    </n-form-item>
    <n-form-item style="padding-top: 4px" label="Short Description" path="short_description">
      <n-input v-model:value="formValue.short_description" placeholder="Enter Short Description" />
    </n-form-item>
    <n-form-item style="padding-top: 4px" label="Description" path="description">
      <n-input v-model:value="formValue.description" placeholder="Enter Description" />
    </n-form-item>
    <n-form-item style="padding-top: 4px" label="Price" path="price">
      <n-input v-model:value="formValue.price" placeholder="Enter Price" />
    </n-form-item>
    <n-form-item style="padding-top: 4px" label="Sale Price" path="sale_price">
      <n-input v-model:value="formValue.sale_price" placeholder="Enter Sale Price" />
    </n-form-item>
    <n-form-item style="padding-top: 4px" label="product_images" path="product_images">
      <n-input v-model:value="formValue.product_images" placeholder="product_images" />
    </n-form-item>
    <n-form-item style="padding-top: 4px" label="Active" path="is_active">
      <n-space>
        <n-switch />
      </n-space>
    </n-form-item>
    <n-space :vertical="true" style="align-items: center">
      <n-form-item>
        <n-button style="alignment: center" @click="handleValidateClick"> Create</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { createProductApi } from '@/api/products/product';

  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const emits = defineEmits(['created']);
  const rules = ref({
    title: {
      required: true,
      message: 'Please Enter title',
      trigger: 'blur',
    },
    product_sku: {
      required: true,
      message: 'Please Enter SKU ID',
      trigger: 'blur',
    },
    slug: {
      required: true,
      message: 'Please Enter Slug',
      trigger: 'blur',
    },
    price: {
      required: true,
      message: 'Please Enter price',
      trigger: 'blur',
    },
    sale_price: {
      required: true,
      message: 'Please Enter Sale Price',
      trigger: 'blur',
    },
    description: {
      required: true,
      message: 'Please Enter description',
      trigger: 'blur',
    },
    short_description: {
      required: true,
      message: 'Please Enter Short Description',
      trigger: 'blur',
    },
    product_images: {
      required: true,
      message: 'Please Upload Product Images',
      trigger: 'blur',
    },
  });

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        const {
          title,
          product_sku,
          slug,
          description,
          short_description,
          price,
          sale_price,
          product_images,
          is_active,
        } = formValue.value;
        createProductApi({
          title,
          product_sku,
          slug,
          description,
          short_description,
          price,
          sale_price,
          product_images,
          is_active,
        }).then((result: any) => {
          window['$message'].success(result.message);
          emits('created', result.result);
        });
      } else {
        console.log(errors);
        window['$message'].error('Please fill out required fields');
      }
    });
  };
</script>

<style lang="less" scoped></style>
