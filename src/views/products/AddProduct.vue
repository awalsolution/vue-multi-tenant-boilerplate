<template>
  <n-card>
    <n-form ref="formRef" :label-width="80" :model="product" :rules="rules">
      <n-row :gutter="10">
        <n-col :span="18">
          <n-space :vertical="true">
            <n-card title="Title">
              <n-form-item label="Product Title" path="title">
                <n-input v-model:value="product.title" placeholder="Enter Product Title" />
              </n-form-item>
            </n-card>
            <n-card title="Description">
              <!-- <QuillEditor
                ref="quillEditor"
                :options="options"
                v-model:content="product.description"
                style="height: 350px"
                class="quillEditor"
              /> -->
              <n-form-item label="Product Description" path="description">
                <n-input
                  v-model:value="product.description"
                  type="textarea"
                  placeholder="Enter Product Description"
                />
              </n-form-item>
              <n-form-item label="Product Product SKU ID" path="product_sku">
                <n-input v-model:value="product.product_sku" placeholder="Enter Product SKU ID" />
              </n-form-item>
            </n-card>
            <n-card title="Inventory" class="flex w-full mb-1">
              <template #header-extra>
                <n-space>
                  <n-button type="success" @click="showMemberModal = true"> Add Variant </n-button>
                </n-space>
              </template>
              <n-row gutter="12">
                <n-table v-if="product.variations.length" :striped="true">
                  <thead>
                    <tr>
                      <th>Attribute ID</th>
                      <th>Product Price</th>
                      <th>Product Regular Price</th>
                      <th>Product Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in product.variations" :key="index">
                      <td>{{ item.attribute_id }}</td>
                      <td>{{ item.price }}</td>
                      <td>{{ item.regular_price }}</td>
                      <td>{{ item.product_images }}</td>
                      <td>
                        <n-button
                          strong
                          secondary
                          circle
                          type="error"
                          @click="product.variations.splice(index, 1)"
                        >
                          <template #icon>
                            <n-icon>
                              <Delete20Filled />
                            </n-icon>
                          </template>
                        </n-button>
                        <n-button
                          strong
                          secondary
                          circle
                          type="success"
                          @click="editVariant(item, index)"
                        >
                          <template #icon>
                            <n-icon>
                              <NotepadEdit20Filled />
                            </n-icon>
                          </template>
                        </n-button>
                      </td>
                    </tr>
                  </tbody>
                </n-table>
              </n-row>
            </n-card>
          </n-space>
        </n-col>
        <n-modal style="width: 70%" v-model:show="showMemberModal" preset="dialog">
          <template #header>
            <div>{{ modelTitle }}</div>
          </template>
          <n-space :vertical="true">
            <n-card title="Inventory">
              <n-row :gutter="10">
                <n-col :span="12">
                  <n-form-item label="Attribute" path="attribute_id">
                    <single-attribute-selector
                      v-model:value="variant.attribute_id"
                      label-field="name"
                      value-field="id"
                      :tag="true"
                    />
                  </n-form-item>
                </n-col>
              </n-row>
              <n-row :gutter="10">
                <n-col :span="12">
                  <n-form-item label="Product Price" path="price">
                    <n-input v-model:value="variant.price" placeholder="Enter Product Price" />
                  </n-form-item>
                </n-col>
                <n-col :span="12">
                  <n-form-item label="Product Regular Price" path="regular_price">
                    <n-input
                      v-model:value="variant.regular_price"
                      placeholder="Enter Product Regular Price"
                    />
                  </n-form-item>
                </n-col>
                <n-col :span="12">
                  <n-form-item label="Product Image" path="product_image">
                    <n-input
                      v-model:value="variant.product_images"
                      placeholder="Enter Product Image"
                    />
                  </n-form-item>
                </n-col>
              </n-row>
            </n-card>
            <n-row>
              <n-button strong secondary circle type="success" size="large" @click="addVariant">
                <template #icon>
                  <n-icon size="30">
                    <SaveArrowRight20Filled />
                  </n-icon>
                </template>
              </n-button>
            </n-row>
          </n-space>
        </n-modal>
        <n-col :span="6">
          <n-space :vertical="true">
            <n-card title="Publish">
              <n-form-item label="Status" path="status">
                <n-select v-model:value="product.status" :options="status" />
              </n-form-item>
              <n-button @click="handleValidateClick" class="float-right"> Create</n-button>
            </n-card>
            <n-card title="Product Categories">
              <n-form-item label="Categories" path="category_id">
                <single-category-selector
                  v-model:value="product.category_id"
                  label-field="name"
                  value-field="id"
                  :tag="false"
                />
              </n-form-item>
            </n-card>
          </n-space>
        </n-col>
      </n-row>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { SaveArrowRight20Filled, Delete20Filled, NotepadEdit20Filled } from '@vicons/fluent';
  import { createProductApi } from '@/api/products/product';
  // import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  // import { BasicUpload } from '@/components/Upload';
  // import { useGlobSetting } from '@/hooks/setting';

  // const quillEditor = ref();
  const formRef = ref<FormInst | null>(null);
  const product: any = ref({
    variations: [],
  });
  const variant: any = ref({});
  const showMemberModal = ref(false);
  const modelTitle = ref('Add Product Variant');
  const loading = ref(false);

  function addVariant() {
    showMemberModal.value = false;
    console.log('variant ==>', variant.value);
    const old_variant = product.value.variations;
    const new_variant = variant.value;

    const variantExists = old_variant.some((variant: any) => {
      return variant.attribute_id === new_variant.attribute_id;
    });
    if (variantExists) {
      window['$message'].error('Variant already exists');
      // variant.value = {};
    } else {
      product.value.variations.push(new_variant);
      variant.value = {};
      modelTitle.value = 'Add Product Variant';
    }
  }

  function editVariant(item: any, index: any) {
    variant.value = item;
    product.value.variations.splice(index, 1);
    modelTitle.value = 'Update Product Variant';
    showMemberModal.value = true;
  }
  // const globSetting = useGlobSetting();
  // const { uploadUrl } = globSetting;

  const emits = defineEmits(['created']);
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
    description: {
      required: true,
      message: 'Please Enter description',
      trigger: 'blur',
    },
    // product_sku: {
    //   required: true,
    //   message: 'Please Enter SKU ID',
    //   trigger: 'blur',
    // },
    // price: {
    //   required: true,
    //   message: 'Please Enter price',
    //   trigger: 'blur',
    // },
    // regular_price: {
    //   required: true,
    //   message: 'Please Enter Sale Price',
    //   trigger: 'blur',
    // },
  });

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        console.log('product object ==>', product.value);
        loading.value = true;
        createProductApi(product.value).then((result: any) => {
          window['$message'].success(result.message);
          emits('created', result.result);
          loading.value = false;
        });
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

  // const options = reactive({
  //   modules: {
  //     toolbar: [
  //       ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  //       ['blockquote', 'code-block'],
  //       [{ header: 1 }, { header: 2 }], // custom button values
  //       [{ list: 'ordered' }, { list: 'bullet' }],
  //       [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  //       [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  //       [{ direction: 'rtl' }], // text direction
  //       [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //       [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  //       [{ font: [] }],
  //       [{ align: [] }],
  //       ['clean'],
  //       ['image'],
  //     ],
  //   },
  //   theme: 'snow',
  //   placeholder: 'Enter what you like!',
  // });
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
