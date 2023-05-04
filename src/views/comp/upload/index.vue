<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Upload pictures">
        Upload pictures to collect picture information from users
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <n-grid cols="2 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
        <n-grid-item offset="0 s:0 m:1 l:1 xl:1 2xl:1">
          <n-form
            :label-width="80"
            :model="formValue"
            :rules="rules"
            label-placement="left"
            ref="formRef"
            class="py-8"
          >
            <n-form-item label="Appointment Name" path="name">
              <n-input v-model:value="formValue.name" placeholder="enter name" />
            </n-form-item>
            <n-form-item label="Reservation Number" path="mobile">
              <n-input placeholder="phone number" v-model:value="formValue.mobile" />
            </n-form-item>

            <n-form-item label="Case pictures" path="images">
              <BasicUpload
                :action="`${uploadUrl}/v1.0/files`"
                :headers="uploadHeaders"
                :data="{ type: 0 }"
                name="files"
                :width="100"
                :height="100"
                @uploadChange="uploadChange"
                v-model:value="formValue.images"
                helpText="A single file does not exceed 2MB, and a maximum of 10 files can be uploaded"
              />
            </n-form-item>
            <div style="margin-left: 80px">
              <n-space>
                <n-button type="primary" @click="formSubmit">Submit Appointment</n-button>
                <n-button @click="resetForm">Reset</n-button>
              </n-space>
            </div>
          </n-form>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, reactive } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicUpload } from '@/components/Upload';
  import { useGlobSetting } from '@/hooks/setting';

  const globSetting = useGlobSetting();

  const rules = {
    name: {
      required: true,
      message: 'Please enter the appointment name',
      trigger: 'blur',
    },
    remark: {
      required: true,
      message: 'Please enter reservation notes',
      trigger: 'blur',
    },
    images: {
      required: true,
      type: 'array',
      message: 'Please upload the picture of the case',
      trigger: 'change',
    },
  };

  const formRef: any = ref(null);
  const message = useMessage();
  const { uploadUrl } = globSetting;

  const formValue = reactive({
    name: '',
    mobile: '',
    //Picture list is usually viewed and edited using absolute path | relative path can be
    images: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
  });

  const uploadHeaders = reactive({
    platform: 'miniPrograms',
    timestamp: new Date().getTime(),
    token: 'Q6fFCuhc1vkKn5JNFWaCLf6gRAc5n0LQHd08dSnG4qo=',
  });

  function formSubmit() {
    formRef.value.validate((errors) => {
      if (!errors) {
        message.success('Verification succeeded');
      } else {
        message.error('Verification failed, please fill in complete information');
      }
    });
  }
  function resetForm() {
    formRef.value.restoreValidation();
  }

  function uploadChange(list: string[]) {
    formValue.images = unref(list);
  }
</script>
