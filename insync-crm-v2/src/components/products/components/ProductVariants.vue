<template>
  <div class="variant_container" :loading="loading">
    <div class="flex justify-between items-center">
      <h3 class="text-lg">Variant List</h3>
      <NButton @click="handleVariantAdd()" v-permission="{ action: ['can view variant create'] }">
        Create New
      </NButton>
    </div>

    <n-row gutter="15">
      <n-card v-if="list.length === 0" class="flex justify-center items-center italic mx-2">
        Product Variants does not Exist.
      </n-card>
      <n-col :span="12" v-else v-for="item in list" :key="item.id">
        <n-card
          title="Variant ID"
          :segmented="{
            content: true,
            action: true,
          }"
          class="my-2"
        >
          <template #header-extra> {{ item.id }} </template>
          <div class="flex justify-between py-1">
            <div>Variant Code</div>
            <div>{{ item.sku_id }}</div>
          </div>
          <div class="flex justify-between py-1">
            <div>Attribute Name</div>
            <div>{{ item.attributes.name }}</div>
          </div>
          <div class="flex justify-between py-1">
            <div>Attribute Value</div>
            <div>{{ item.attribute_value }}</div>
          </div>
          <div class="flex justify-between py-1">
            <div>Status</div>
            <div>
              <n-tag :bordered="false" type="info">{{ item.status }}</n-tag>
            </div>
          </div>
          <div class="flex justify-between py-1">
            <div>Stock Status</div>
            <div>
              <n-tag :bordered="false" type="info">{{ item.stock_status }}</n-tag>
            </div>
          </div>
          <div class="flex justify-between py-1">
            <div>Quantity</div>
            <div> {{ item.stock_quantity }} </div>
          </div>
          <div class="flex justify-between py-1">
            <div>Price</div>
            <div> {{ item.price }} </div>
          </div>
          <div class="flex justify-between py-1">
            <div>Regular Price</div>
            <div> {{ item.regular_price }} </div>
          </div>
          <div class="flex justify-between py-1">
            <div>Created At</div>
            <div> {{ item.created_at }} </div>
          </div>
          <div class="flex justify-between py-1">
            <div>Updated At</div>
            <div> {{ item.updated_at }} </div>
          </div>
          <div class="mt-4">
            <div>Image List:</div>
            <div class="flex gap-3 flex-wrap">
              <div v-for="img in item.images" :key="img.id" class="py-3">
                <n-avatar :size="100" :src="`${imgUrl}${img.images}`" />
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center py-1">
            <div>Actions</div>
            <div class="flex gap-2">
              <n-button
                secondary
                type="info"
                :render-icon="renderIcon(EditOutlined)"
                v-permission="{
                  action: ['can view variant update'],
                }"
                @click="handleVariantUpdate(item.id)"
              >
                Edit
              </n-button>
              <n-button
                secondary
                type="error"
                :render-icon="renderIcon(DeleteOutlined)"
                v-permission="{
                  action: ['can view variant delete'],
                }"
                @click="confirmationDialog(item.id)"
              >
                Delete
              </n-button>
            </div>
          </div>
        </n-card>
      </n-col>
    </n-row>

    <n-modal style="width: 60%" v-model:show="showModal" preset="dialog">
      <template #header>
        <div>Create New Variant</div>
      </template>
      <n-space :vertical="true">
        <add-variant
          @created="
            getVariantList();
            showModal = false;
          "
        />
      </n-space>
    </n-modal>

    <n-modal style="width: 60%" v-model:show="showEditModal" preset="dialog">
      <template #header>
        <div>Update Variant</div>
      </template>
      <n-space :vertical="true">
        <edit-variant
          :id="selectedId"
          @updated="
            getVariantList();
            showEditModal = false;
          "
        />
      </n-space>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useDialog, useMessage } from 'naive-ui';
  import { EditOutlined, DeleteOutlined } from '@vicons/antd';
  import { useEnv } from '@src/hooks/useEnv';
  import { RenderUtils } from '@src/utils/render';
  import { useLoading } from '@src/hooks/useLoading';
  import { deleteRecordApi, getRecordApi } from '@src/api/endpoints';
  import AddVariant from '@src/components/products/variants/AddVariant.vue';
  import EditVariant from '@src/components/products/variants/EditVariant.vue';

  const props = defineProps<{
    variants: Record<string, any>;
  }>();

  const { renderIcon } = RenderUtils;
  const { imgUrl } = useEnv();
  const route = useRoute();
  const dialog = useDialog();
  const selectedId = ref();
  const showModal = ref(false);
  const showEditModal = ref(false);
  const message: any = useMessage();
  const list: any = ref(props.variants);
  const [loading, loadingDispatcher] = useLoading(false);

  console.log('getVariantsByProduct ===>', list);

  function confirmationDialog(id: any) {
    selectedId.value = id;
    dialog.error({
      title: 'Confirmation',
      content: () => 'Are you sure you want to delete?',
      positiveText: 'Delete',
      negativeText: 'Cancel',
      onPositiveClick: deleteOperation,
    });
  }

  function deleteOperation() {
    loadingDispatcher.loading();
    deleteRecordApi(`/variants/${selectedId.value}`)
      .then((result: any) => {
        message.success(result.message);
        getVariantList();
        loadingDispatcher.loaded();
        dialog.destroyAll;
      })
      .catch((result: any) => {
        message.error(result.message);
        loadingDispatcher.loaded();
        dialog.destroyAll;
      });
    selectedId.value = null;
  }

  const handleVariantAdd = () => {
    showModal.value = true;
    // selectedId.value = id;
  };

  const handleVariantUpdate = (id: any) => {
    showEditModal.value = true;
    selectedId.value = id;
  };

  const getVariantList = () => {
    getRecordApi(`/variants/getVariantsByProduct/${route.params.id}`).then((result: any) => {
      list.value = result.result;
    });
  };
</script>

<style lang="scss" scoped>
  .variant_container {
    @apply relative p-2  border-x border-b border-gray-200 dark:border-gray-800;
  }
  .data_placeholder {
    text-align: center;
    color: gray;
    padding: 20px 0;
    font-size: 18px;
    font-style: italic;
  }
</style>
