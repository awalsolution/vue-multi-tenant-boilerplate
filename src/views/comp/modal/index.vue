<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="modal box">
        Modal box, used to collect or display information to users, Modal adopts Dialog preset to
        extend drag and drop effect
        <br />
        The following is useModal Mode, ref mode, is also supported, and the usage is consistent
        with other components, such as: modalRef.value.closeModal()
      </n-card>
    </div>
    <n-card :bordered="false" class="proCard mt-4">
      <n-alert title="Modal nested Form" type="info">
        Use useModal to display and operate pop-up windows, and demonstrate the combined use of
        Modal and Form components
      </n-alert>
      <n-divider />
      <n-space>
        <n-button type="primary" @click="showModal">Open Modal nested Form example</n-button>
      </n-space>
      <n-divider />
      <n-alert title="Personalized lightweight" type="info">
        Use useModal to display and operate pop-up windows, customize configurations, and achieve
        lightweight effects. For more configurations, please refer to the documentation
      </n-alert>
      <n-divider />
      <n-space>
        <n-button type="primary" @click="showLightModal">Lightweight confirmation</n-button>
      </n-space>
      <n-divider />
      <n-alert title="Alert" type="info">
        The component is exposed, the setProps method is used to modify the internals of the
        component Props, such as title, etc., refer to the UI framework document, DialogReactive
        Properties for details
      </n-alert>
    </n-card>

    <basicModal @register="modalRegister" ref="modalRef" class="basicModal" @on-ok="okModal">
      <template #default>
        <BasicForm @register="register" @reset="handleReset" class="basicForm">
          <template #statusSlot="{ model, field }">
            <n-input v-model:value="model[field]" />
          </template>
        </BasicForm>
      </template>
    </basicModal>

    <basicModal
      @register="lightModalRegister"
      class="basicModalLight"
      ref="modalRef"
      @on-ok="lightOkModal"
    >
      <template #default>
        <p class="text-gray-500" style="padding-left: 35px">Some Dialog Content</p>
      </template>
    </basicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue';
  import { useMessage } from 'naive-ui';
  import { basicModal, useModal } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'NInput',
      label: 'Name',
      labelMessage: 'This is a hint',
      giProps: {
        span: 1,
      },
      componentProps: {
        placeholder: 'Please enter your name',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: 'Please enter your name', trigger: ['blur'] }],
    },
    {
      field: 'mobile',
      component: 'NInputNumber',
      label: 'mobile phone',
      componentProps: {
        placeholder: 'Please enter your mobile number',
        showButton: false,
        onInput: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'type',
      component: 'NSelect',
      label: 'Type',
      giProps: {
        //span: 24,
      },
      componentProps: {
        placeholder: 'Please select a type',
        options: [
          {
            label: 'Comfort',
            value: 1,
          },
          {
            label: 'Economy',
            value: 2,
          },
        ],
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeDate',
      component: 'NDatePicker',
      label: 'Appointment time',
      giProps: {
        //span: 24,
      },
      defaultValue: 1183135260000,
      componentProps: {
        type: 'date',
        clearable: true,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeTime',
      component: 'NTimePicker',
      label: 'stay time',
      giProps: {
        //span: 24,
      },
      componentProps: {
        clearable: true,
        onUpdateValue: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeProject',
      component: 'NCheckbox',
      label: 'reservation item',
      giProps: {
        //span: 24,
      },
      componentProps: {
        placeholder: 'Please select a reservation item',
        options: [
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
        ],
        onUpdateChecked: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'makeSource',
      component: 'NRadioGroup',
      label: 'Source',
      giProps: {
        //span: 24,
      },
      componentProps: {
        options: [
          {
            label: 'online',
            value: 1,
          },
          {
            label: 'Store',
            value: 2,
          },
        ],
        onUpdateChecked: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'status',
      label: 'Status',
      giProps: {
        //span: 24,
      },
      // slot
      slot: 'statusSlot',
    },
  ];

  export default defineComponent({
    components: { basicModal, BasicForm },
    setup() {
      const modalRef: any = ref(null);
      const message = useMessage();

      const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
        title: 'Add Appointment',
      });

      const [
        lightModalRegister,
        {
          openModal: lightOpenModal,
          closeModal: lightCloseModal,
          setSubLoading: lightSetSubLoading,
        },
      ] = useModal({
        title: 'Confirmation Dialog',
        showIcon: true,
        type: 'warning',
        closable: false,
        maskClosable: true,
      });

      const [register, { submit }] = useForm({
        gridProps: { cols: 1 },
        collapsedRows: 3,
        labelWidth: 120,
        layout: 'horizontal',
        submitButtonText: 'Submit an Appointment',
        showActionButtonGroup: false,
        schemas,
      });

      const state = reactive({
        formValue: {
          name: 'Pony Brother',
        },
      });

      async function okModal() {
        const formRes = await submit();
        if (formRes) {
          closeModal();
          message.success('submitted successfully');
        } else {
          message.error('Verification failed, please fill in complete information');
          setSubLoading(false);
        }
      }

      function lightOkModal() {
        lightCloseModal();
        lightSetSubLoading(false);
      }

      function showLightModal() {
        lightOpenModal();
      }

      function showModal() {
        openModal();
      }

      function handleReset(values: Recordable) {
        console.log(values);
      }

      return {
        ...toRefs(state),
        modalRef,
        register,
        modalRegister,
        lightModalRegister,
        handleReset,
        showModal,
        okModal,
        lightOkModal,
        showLightModal,
      };
    },
  });
</script>

<style lang="less">
  .basicForm {
    padding-top: 20px;
  }

  .n-dialog.basicModal {
    width: 640px;
  }

  .n-dialog.basicModalLight {
    width: 416px;
    padding-top: 26px;
  }
</style>
