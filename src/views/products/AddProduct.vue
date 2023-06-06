<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <n-card>
    <n-form ref="formRef" :label-width="80" :model="product" :rules="rules">
      <n-row :gutter="10">
        <n-col :span="18">
          <n-space :vertical="true">
            <n-card title="Title">
              <n-input v-model:value="product.title" placeholder="Enter Product Title" />
            </n-card>
            <n-card title="Description">
              <QuillEditor
                ref="quillEditor"
                :options="options"
                v-model:content="product.description"
                style="height: 350px"
                class="quillEditor"
              />
            </n-card>
            <n-card title="Media"></n-card>
            <n-card title="Pricing">
              <n-row :gutter="10">
                <n-col :span="12">
                  <n-form-item label="Product Price" path="price">
                    <n-input v-model:value="product.price" placeholder="Enter Product Price" />
                  </n-form-item>
                </n-col>
                <n-col :span="12">
                  <n-form-item label="Product Regular Price" path="regular_price">
                    <n-input
                      v-model:value="product.regular_price"
                      placeholder="Enter Product Regular Price"
                    />
                  </n-form-item>
                </n-col>
              </n-row>
            </n-card>
            <n-card title="Inventory">
              <n-row :gutter="10">
                <n-col :span="12">
                  <n-form-item label="Product Price" path="price">
                    <n-input v-model:value="product.price" placeholder="Enter Product Price" />
                  </n-form-item>
                </n-col>
                <n-col :span="12">
                  <n-form-item label="Product Regular Price" path="regular_price">
                    <n-input
                      v-model:value="product.regular_price"
                      placeholder="Enter Product Regular Price"
                    />
                  </n-form-item>
                </n-col>
              </n-row>
              <n-form-item label="Product SKU ID" path="product_sku_id">
                <n-input
                  v-model:value="product.product_sku_id"
                  placeholder="Enter Product SKU ID"
                />
              </n-form-item>
            </n-card>
            <n-card title="Variants">
              <n-form-item label="Product Type" path="product_type">
                <n-select v-model:value="product.varients" :options="varients" />
              </n-form-item>
              <n-dynamic-input v-model:value="product.varients" placeholder="Come on" />
            </n-card>
          </n-space>
        </n-col>
        <n-col :span="6">
          <n-space :vertical="true">
            <n-card title="Publish">
              <n-form-item label="Status" path="status">
                <n-select v-model:value="product.status" :options="status" />
              </n-form-item>
              <n-button @click="handleValidateClick" class="float-right"> Create</n-button>
            </n-card>
            <n-card title="Product Categories">
              <n-form-item label="Categories" path="categories">
                <n-select v-model:value="product.category_id" :options="categories" />
              </n-form-item>
              <n-button>Add New Category</n-button>
            </n-card>
          </n-space>
        </n-col>
      </n-row>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { FormInst } from 'naive-ui';
  import { createProductApi } from '@/api/products/product';
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  // import { BasicUpload } from '@/components/Upload';
  // import { useGlobSetting } from '@/hooks/setting';

  const quillEditor = ref();
  const formRef = ref<FormInst | null>(null);
  const product: any = ref({});

  // const globSetting = useGlobSetting();
  // const { uploadUrl } = globSetting;

  // const emits = defineEmits(['created']);
  const rules = ref({
    title: {
      required: true,
      message: 'Please Enter title',
      trigger: 'blur',
    },
    status: {
      required: true,
      message: 'Please Select Status',
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
    regular_price: {
      required: true,
      message: 'Please Enter Sale Price',
      trigger: 'blur',
    },
    description: {
      required: false,
      message: 'Please Enter description',
      trigger: 'blur',
    },
    category_id: {
      required: true,
      message: 'Please Select Categories',
      trigger: 'blur',
    },
    // product_type: {
    //   required: true,
    //   message: 'Please Select Product Type',
    //   trigger: 'blur',
    // },
    // dynamicInputValue: [{ value: '', name: '' }],
    dynamicInputRule: {
      trigger: 'input',
      validator(rule: unknown, value: string) {
        if (value.length >= 5) return new Error('Input up to 4 characters');
        return true;
      },
    },
    product_images: {
      required: true,
      message: 'Please Upload Product Images',
      trigger: 'blur',
    },
  });

  // const uploadList = ref([
  //   'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  // ]);
  // const uploadHeaders = reactive({
  //   platform: 'miniPrograms',
  //   timestamp: new Date().getTime(),
  //   token: 'Q6fFCuhc1vkKn5JNFWaCLf6gRAc5n0LQHd08dSnG4qo=',
  // });
  // function uploadChange(list: string[]) {
  //   console.log(list);
  // }
  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        console.log('product object ==>', product.value);
        // createProductApi(product.value).then((result: any) => {
        //   window['$message'].success(result.message);
        //   emits('created', result.result);
        // });
      } else {
        console.log(errors);
        window['$message'].error('Please fill out required fields');
      }
    });
  };

  const status = [
    {
      label: 'Active',
      value: 'active',
    },
    {
      label: 'Draft',
      value: 'draft',
    },
  ];
  const varients = [
    {
      label: 'Color',
      value: 'color',
    },
    {
      label: 'Size',
      value: 'size',
    },
  ];
  // const product_type = [
  //   {
  //     label: 'Simple Product',
  //     value: 'simple_product',
  //   },
  //   {
  //     label: 'Variable Product',
  //     value: 'variable_product',
  //   },
  // ];

  const options = reactive({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['image'],
      ],
    },
    theme: 'snow',
    placeholder: 'Enter what you like!',
  });

  const categories = [
    {
      label: 'categoy 01',
      value: 'category-01',
    },
    {
      label: 'categoy 02',
      value: 'category-02',
    },
    {
      label: 'categoy 03',
      value: 'category-03',
    },
  ];
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
</style>
