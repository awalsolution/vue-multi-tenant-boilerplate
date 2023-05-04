<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Basic Form">
        Form pages are used to collect or verify information from users, and basic forms are often
        used in form scenarios with fewer data items. Form field tags can also support
        responsiveness.
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <n-grid cols="1 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
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
            <n-form-item label="Appointment time" path="datetime">
              <n-date-picker type="datetime" v-model:value="formValue.datetime" />
            </n-form-item>
            <n-form-item label="Doctor appointment" path="doctor">
              <n-select
                placeholder="Please select an appointment doctor"
                :options="doctorList"
                v-model:value="formValue.doctor"
              />
            </n-form-item>
            <n-form-item label="Appointment Items" path="matter">
              <n-select
                placeholder="Please select an appointment item"
                :options="matterList"
                v-model:value="formValue.matter"
                multiple
              />
            </n-form-item>
            <n-form-item label="sex" path="sex">
              <n-radio-group v-model:value="formValue.sex" name="sex">
                <n-space>
                  <n-radio :value="1">Male</n-radio>
                  <n-radio :value="2">Female</n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <n-form-item label="Reservation Remarks" path="remark">
              <n-input
                v-model:value="formValue.remark"
                type="textarea"
                placeholder="Please enter reservation notes"
              />
            </n-form-item>
            <n-form-item label="image" path="img">
              <BasicUpload
                :action="`${uploadUrl}/v1.0/files`"
                :headers="uploadHeaders"
                :data="{ type: 0 }"
                name="files"
                :width="100"
                :height="100"
                @uploadChange="uploadChange"
                v-model:value="uploadList"
                helpText="A single file does not exceed 20MB, and a maximum of 10 files can be uploaded"
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

  const matterList = [
    {
      label: 'Implant teeth',
      value: 1,
    },
    {
      label: 'tooth filling',
      value: 2,
    },
    {
      label: 'root canal',
      value: 3,
    },
  ];

  const doctorList = [
    {
      label: 'Doctor Li',
      value: 1,
    },
    {
      label: 'Doctor Huang',
      value: 2,
    },
    {
      label: 'Doctor Zhang',
      value: 3,
    },
  ];

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
    mobile: {
      required: true,
      message: 'Please enter the appointment phone number',
      trigger: ['input'],
    },
    datetime: {
      required: true,
      type: 'number',
      message: 'Please select an appointment time',
      trigger: ['blur', 'change'],
    },
    doctor: {
      required: true,
      type: 'number',
      message: 'Please select an appointment doctor',
      trigger: 'change',
    },
  };

  const formRef: any = ref(null);
  const message = useMessage();
  const { uploadUrl } = globSetting;

  const defaultValueRef = () => ({
    name: '',
    mobile: '',
    remark: '',
    sex: 1,
    matter: null,
    doctor: null,
    datetime: [],
  });

  let formValue = reactive(defaultValueRef());
  const uploadList = ref([
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  ]);
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
    formValue = Object.assign(unref(formValue), defaultValueRef());
  }

  function uploadChange(list: string[]) {
    console.log(list);
  }
</script>
