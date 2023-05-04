<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="120" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="sender email" path="originator">
          <n-input v-model:value="formValue.originator" placeholder="Please enter sender email" />
        </n-form-item>

        <n-form-item label="SMTP server address">
          <n-input placeholder="Please enter the SMTP server address" />
        </n-form-item>

        <n-form-item label="SMTP server port">
          <n-input placeholder="Please enter the SMTP server port" />
        </n-form-item>

        <n-form-item label="SMTP username">
          <n-input placeholder="Please enter SMTP username" />
        </n-form-item>

        <n-form-item label="SMTP Password">
          <n-input type="password" placeholder="Please enter SMTP password" />
        </n-form-item>

        <n-form-item label="Mail Test">
          <n-button>Mail Test</n-button>
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">Update email information</n-button>
          </n-space>
        </div>
      </n-form>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { useMessage } from 'naive-ui';

  const rules = {
    originator: {
      required: true,
      message: "Please enter the sender's email address",
      trigger: 'blur',
    },
  };
  export default defineComponent({
    setup() {
      const formRef: any = ref(null);
      const message = useMessage();

      const state = reactive({
        formValue: {
          originator: '',
        },
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

      return {
        formRef,
        ...toRefs(state),
        rules,
        formSubmit,
      };
    },
  });
</script>
