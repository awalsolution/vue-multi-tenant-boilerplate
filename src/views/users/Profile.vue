<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <n-card title="Profile" v-permission="{ action: ['can view profile'] }">
    <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
      <n-row>
        <n-col :span="8">
          <BasicUpload
            :action="uploadUrl"
            :data="{ type: 0 }"
            name="profile_picture"
            :width="100"
            :height="100"
            @uploadChange="uploadChange"
            v-model:value="formValue.profile_picture"
          />
        </n-col>
        <n-col :span="16">
          <n-space style="display: block" vertical>
            <n-card title="Profile Details">
              <n-row gutter="12">
                <n-col :span="8">
                  <n-form-item label="First Name" path="first_name">
                    <n-input v-model:value="formValue.first_name" placeholder="Enter First Name" />
                  </n-form-item>
                </n-col>
                <n-col :span="8">
                  <n-form-item label="Last Name" path="last_name">
                    <n-input v-model:value="formValue.last_name" placeholder="Enter Last Name" />
                  </n-form-item>
                </n-col>
                <n-col :span="8">
                  <n-form-item label="Phone Number" path="phone_number">
                    <n-input
                      v-model:value="formValue.phone_number"
                      placeholder="Enter Phone Number"
                    />
                  </n-form-item>
                </n-col>
                <n-col :span="8">
                  <n-form-item label="Address" path="address">
                    <n-input v-model:value="formValue.address" placeholder="Enter Address" />
                  </n-form-item>
                </n-col>
                <n-col :span="8">
                  <n-form-item label="City" path="city">
                    <n-input v-model:value="formValue.city" placeholder="Enter City" />
                  </n-form-item>
                </n-col>
                <n-col :span="8">
                  <n-form-item label="State" path="state">
                    <n-input v-model:value="formValue.state" placeholder="Enter State" />
                  </n-form-item>
                </n-col>
                <n-col :span="8">
                  <n-form-item label="Country" path="country">
                    <n-input v-model:value="formValue.country" placeholder="Enter Country" />
                  </n-form-item>
                </n-col>
              </n-row>
            </n-card>
          </n-space>
          <n-space justify="end">
            <n-form-item :theme-overrides="{ feedbackHeightSmall: '0' }">
              <n-button type="success" @click="handleValidateClick"> Save Profile</n-button>
            </n-form-item>
          </n-space>
        </n-col>
      </n-row>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
  import { onMounted, ref, unref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { profileUpdateApi } from '@/api/user/user';
  import { BasicUpload } from '@/components/Upload';
  import { useUserStore } from '@/store/modules/user';
  import { useGlobSetting } from '@/hooks/setting';

  const globSetting = useGlobSetting();
  const formRef = ref<FormInst | null>(null);
  const formValue: any = ref({});
  const userStore = useUserStore();
  const { uploadUrl } = globSetting;
  console.log('form value', formValue);
  function uploadChange(list: string[]) {
    formValue.value.profile_picture = unref(list);
  }
  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        console.log('form submited data', formValue.value);
        profileUpdateApi(formValue.value.id, formValue.value).then((result: any) => {
          window['$message'].success(result.message);
        });
      } else {
        console.log(errors);
        window['$message'].error('Invalid');
      }
    });
  };

  onMounted(() => {
    formValue.value = userStore.info.profile;
  });

  const rules = ref({
    first_name: {
      required: true,
      message: 'Please Enter First Name',
      trigger: 'blur',
    },
    last_name: {
      required: true,
      message: 'Please Enter Last Name',
      trigger: 'blur',
    },
    phone_number: {
      required: true,
      message: 'Please Enter Phone Number',
      trigger: 'blur',
    },
    address: {
      required: true,
      message: 'Please Enter Address',
      trigger: 'blur',
    },
    city: {
      required: true,
      message: 'Please Enter City',
      trigger: 'blur',
    },
    state: {
      required: true,
      message: 'Please Enter State',
      trigger: 'blur',
    },
    country: {
      required: true,
      message: 'Please Enter Country',
      trigger: 'blur',
    },
  });
</script>
<style lang="less" scoped></style>
