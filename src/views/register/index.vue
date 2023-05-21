<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top-logo">
        <!-- <img :src="websiteConfig.loginImage" alt="" /> -->
        <n-h1>InSync CRM Registration</n-h1>
      </div>
      <!-- <div class="view-account-top-desc pb-5">{{ websiteConfig.loginDesc }}</div> -->
      <div class="view-account-form">
        <n-form ref="formRef" label-placement="top" size="large" :model="formInline" :rules="rules">
          <n-grid :span="24" :x-gap="24">
            <n-form-item-gi :span="12" label="First Name" path="first_name">
              <n-input v-model:value="formInline.first_name" placeholder="Enter First Name">
                <template #prefix>
                  <n-icon size="18" color="#808695">
                    <PersonOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="Last Name" path="last_name">
              <n-input v-model:value="formInline.last_name" placeholder="Enter Last Name">
                <template #prefix>
                  <n-icon size="18" color="#808695">
                    <PersonOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="Email" path="email">
              <n-input v-model:value="formInline.email" placeholder="Enter Email">
                <template #prefix>
                  <n-icon size="20" color="#808695">
                    <PersonMail24Regular />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="Phone Number" path="phone_number">
              <n-input v-model:value="formInline.phone_number" placeholder="Enter Phone Number">
                <template #prefix>
                  <n-icon size="20" color="#808695">
                    <PhoneCheckmark20Regular />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="Password" path="password">
              <n-input
                v-model:value="formInline.password"
                type="password"
                showPasswordOn="click"
                placeholder="Enter Password"
              >
                <template #prefix>
                  <n-icon size="18" color="#808695">
                    <LockClosedOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="User Type" path="user_type">
              <n-select v-model:value="formInline.user_type" size="large" :options="options" />
            </n-form-item-gi>
          </n-grid>
          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              Register
            </n-button>
          </n-form-item>
        </n-form>
      </div>
      <div>Already have an Account! <router-link to="/login">Login</router-link></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from 'naive-ui';
  import { ResultEnum } from '@/enums/httpEnum';
  import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5';
  import { PersonMail24Regular, PhoneCheckmark20Regular } from '@vicons/fluent';
  import { PageEnum } from '@/enums/pageEnum';
  // import { websiteConfig } from '@/config/website.config';
  const options = ref([
    {
      label: 'Vendor',
      value: 'vendor',
    },
    {
      label: 'User',
      value: 'user',
    },
  ]);

  interface FormState {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    user_type: string;
    password: string;
  }

  const formRef = ref();
  const message = useMessage();
  const loading = ref(false);
  const REGISTER_NAME = PageEnum.BASE_REGISTER_NAME;

  const formInline = reactive({
    first_name: 'Iqbal',
    last_name: 'Hassan',
    email: 'iqbal@gmail.com',
    phone_number: '123455667777',
    user_type: 'vendor',
    password: '123456',
  });

  const rules = {
    first_name: { required: true, message: 'Please Enter First Name', trigger: 'blur' },
    last_name: { required: true, message: 'Please Enter Last Name', trigger: 'blur' },
    email: { required: true, message: 'Please Enter User Name', trigger: 'blur' },
    phone_number: { required: true, message: 'Please Enter Phone Number', trigger: 'blur' },
    user_type: { required: true, message: 'Please Select User Type', trigger: 'blur' },
    password: { required: true, message: 'Please Enter Password', trigger: 'blur' },
  };

  const userStore = useUserStore();

  const router = useRouter();
  const route = useRoute();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    formRef.value.validate(async (errors: any) => {
      if (!errors) {
        const { first_name, last_name, email, phone_number, user_type, password } = formInline;
        message.loading('Registering in...');
        loading.value = true;

        const params: FormState = {
          first_name,
          last_name,
          email,
          phone_number,
          user_type,
          password,
        };

        try {
          const response = await userStore.register(params);
          message.destroyAll();
          if (response.code == ResultEnum.SUCCESS) {
            const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
            message.success(response.message);
            if (route.name === REGISTER_NAME) {
              router.replace('/login');
            } else router.replace(toPath);
          } else {
            message.info(response.message || 'Register failed');
          }
        } finally {
          loading.value = false;
        }
      } else {
        message.error('Please fill in the complete information and verify the verification code');
      }
    });
  };
</script>

<style lang="less" scoped>
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    &-form {
      width: 40%;
    }

    &-top {
      padding: 32px 0;
      text-align: center;

      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }

    &-other {
      width: 100%;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }

  @media (min-width: 768px) {
    .view-account {
      background-image: url('../../assets/images/login.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }
</style>
