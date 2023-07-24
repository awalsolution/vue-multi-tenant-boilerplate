<template>
  <n-card title="Profile" v-permission="{ action: ['can view customer profile'] }">
    <n-form ref="formRef" :label-width="80" :model="profileData" size="small">
      <n-grid x-gap="10">
        <n-form-item-gi :span="12" label="First Name" path="first_name">
          <n-input v-model:value="profileData.first_name" placeholder="Enter First Name" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Last Name" path="last_name">
          <n-input v-model:value="profileData.last_name" placeholder="Enter Last Name" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Phone Number" path="phone_number">
          <n-input v-model:value="profileData.phone_number" placeholder="Enter Phone Number" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Address" path="street">
          <n-input v-model:value="profileData.street" placeholder="Enter Address" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="City" path="city">
          <n-input v-model:value="profileData.city" placeholder="Enter City" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="State" path="state">
          <n-input v-model:value="profileData.state" placeholder="Enter State" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Country" path="country">
          <n-input v-model:value="profileData.country" placeholder="Enter Country" />
        </n-form-item-gi>
        <n-form-item-gi :span="24" path="profile_picture">
          <SingleImageUploader
            :action="uploadUrl"
            :data="{ type: 0 }"
            name="customerProfile"
            :width="100"
            :height="100"
            @upload-change="uploadChange"
            v-model:value="profileData.profile_picture"
          />
        </n-form-item-gi>
      </n-grid>
      <n-space justify="end">
        <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
          <n-button type="success" @click="handleValidateClick"> Update</n-button>
        </n-form-item>
      </n-space>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { getRecordApi } from '@/api';
  import { profileUpdateApi } from '@/api/customer/customer';
  import { SingleImageUploader } from '@/components/upload';
  import { useGlobSetting } from '@/hooks/setting';

  const globSetting = useGlobSetting();
  const { uploadUrl } = globSetting;

  const formRef = ref<FormInst | null>(null);
  const profileData: any = ref({});
  const emits = defineEmits(['updated']);

  const props = defineProps({
    id: {
      type: Number,
    },
  });
  // fetch customer using id
  getRecordApi(`/customers/${props.id}`).then((result: any) => {
    console.log(result.profile);
    profileData.value = result.profile;
  });

  const uploadChange = (list: string) => {
    profileData.value.profile_picture = unref(list);
  };
  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        profileUpdateApi(profileData.value.id, profileData.value).then((result: any) => {
          window['$message'].success(result.message);
          emits('updated', result);
        });
      } else {
        console.log(errors);
        window['$message'].error('Invalid');
      }
    });
  };
</script>
<style lang="less" scoped></style>
