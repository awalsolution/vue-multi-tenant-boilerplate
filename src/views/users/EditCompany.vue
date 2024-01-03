<template>
  <n-card title="Company Setting" v-if="isSuperAdminUser()">
    <n-form ref="formRef" :label-width="80" :model="formValue" size="small">
      <n-grid x-gap="10">
        <n-form-item-gi :span="12" label="Company Name" path="compant_name">
          <n-input v-model:value="formValue.company_name" placeholder="Enter Name" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Company Phone" path="phone_number">
          <n-input v-model:value="formValue.phone_number" placeholder="Enter Phone" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Status" path="status">
          <n-switch v-model:value="formValue.status" :checked-value="1" :unchecked-value="0" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Address" path="address">
          <n-input v-model:value="formValue.address" placeholder="Enter Address" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="City" path="city">
          <n-input v-model:value="formValue.city" placeholder="Enter City" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="State" path="state">
          <n-input v-model:value="formValue.state" placeholder="Enter State" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Country" path="country">
          <n-input v-model:value="formValue.country" placeholder="Enter Country" />
        </n-form-item-gi>
        <n-form-item-gi :span="24" path="logo">
          <SingleImageUploader
            :action="uploadUrl"
            :data="{ type: 0 }"
            name="compant_images"
            :width="100"
            :height="100"
            @upload-change="uploadChange"
            v-model:value="formValue.logo"
          />
        </n-form-item-gi>
      </n-grid>
      <n-space justify="end">
        <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
          <n-button secondary type="info" @click="handleValidateClick"> Update</n-button>
        </n-form-item>
      </n-space>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
import { onMounted, ref, unref } from 'vue';
import { type FormInst } from 'naive-ui';
import { updateRecordApi } from '@src/api/endpoints';
import { SingleImageUploader } from '@src/components/upload';
import { useUserStore } from '@src/store/modules/user';
import { useEnv } from '@src/hooks/useEnv';
import { isSuperAdminUser } from '@src/checks/isSuperAdmin';

const { uploadUrl } = useEnv();
const formRef = ref<FormInst | null>(null);
const formValue: any = ref({});
const userStore = useUserStore();

const emits = defineEmits(['updated']);

const uploadChange = (list: string) => {
  formValue.value.logo = unref(list);
};

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateRecordApi(`/company/${formValue.value.id}`, formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('updated', res.result);
      });
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
    }
  });
};

onMounted(() => {
  formValue.value = userStore.currentUser.company;
});
</script>

<style lang="scss" scoped></style>
