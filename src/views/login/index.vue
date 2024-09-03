<template>
  <h2 class="text-3xl font-semibold text-gray-800 mb-6 intro-x">Login</h2>
  <n-form ref="formRef" :model="formData" :rules="formRules" class="intro-x">
    <n-form-item label="Email Address" path="email">
      <n-input
        v-model:value="formData.email"
        placeholder="Enter Email"
        size="large"
        class="rounded-full"
        :theme-overrides="{ border: 'transparent', borderRadius: '25px' }"
      >
        <template #prefix>
          <n-icon size="18" color="#0081E6">
            <PersonOutline />
          </n-icon>
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="Password" path="password" class="mt-0">
      <n-input
        v-model:value="formData.password"
        type="password"
        showPasswordOn="click"
        placeholder="Enter Password"
        size="large"
        class="rounded-full"
        :theme-overrides="{ border: 'transparent', borderRadius: '25px' }"
      >
        <template #prefix>
          <n-icon size="18" color="#0081E6">
            <LockClosedOutline />
          </n-icon>
        </template>
      </n-input>
    </n-form-item>
    <div class="flex items-center justify-between">
      <label class="flex items-center text-sm text-gray-700">
        <input type="checkbox" class="form-checkbox h-4 w-4 text-secondary" />
        <span class="ml-2">Remember me</span>
      </label>
      <a href="#" class="text-sm text-secondary hover:underline">Forgot Password?</a>
    </div>
    <n-button
      type="submit"
      class="login_btn"
      @click="handleSubmit"
      :loading="loading"
      :disabled="loginButton"
    >
      Login
    </n-button>
  </n-form>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, reactive, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type FormValidationError } from 'naive-ui';
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5';
import { useUserStore } from '@src/store/modules/user';
import { AuthUtils } from '@src/utils/auth';
import { useLoading } from '@src/hooks/useLoading';
import type { RememberedAccountData } from '@src/views/login/types';
import { useEnv } from '@src/hooks/useEnv';
import { verifyDomainNameApi } from '@src/api/auth';
import { TENANT_API_KEY } from '@src/utils/storage/variables';
import { storage } from '@src/utils/storage';
import { formRules } from '@src/rules/login';

const formRef = ref();
const rememberPassword = ref(false);
const loginButton = ref(false);
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const [loading, loadingDispatcher] = useLoading(false);
const { centralDomain } = useEnv();
const isHost = window.location.hostname;
const tenantApiKey = storage.getTenantApiKey(TENANT_API_KEY);

const formData = reactive({
  email: 'iqbal@gmail.com',
  password: '123456'
});

const redirectUrl = computed(() => route.query.redirect as string);

console.log('tenant api key ==>', tenantApiKey);

const isLoginButtonDisabled = () => {
  loginButton.value = !(
    window.location.hostname === centralDomain ||
    (storage.getTenantApiKey(TENANT_API_KEY) !== 'null' &&
      storage.getTenantApiKey(TENANT_API_KEY) !== null)
  );
};
``;

const handleSubmit = async () => {
  try {
    await formRef.value!.validate();
  } catch (errors) {
    const errorMessage = (errors as FormValidationError[])[0][0].message;
    if (errorMessage) {
      window['$message'].error(errorMessage);
    }
    return;
  }

  if (loading.value) {
    return;
  }

  loadingDispatcher.start();

  userStore
    .login(formData)
    .then((res: any) => {
      console.log(res);
      loadingDispatcher.end();
      if (res.message) {
        window['$message'].success(res.message);
      }
      if (rememberPassword.value) {
        AuthUtils.setRememberedAccount(JSON.stringify(formData));
      } else {
        AuthUtils.clearRememberedAccount();
      }

      if (redirectUrl.value) {
        router.replace(redirectUrl.value);
      } else {
        router.replace('/');
      }
    })
    .catch((err: any) => {
      console.log(err);
      if (err.message) {
        window['$message'].error(err.message);
      }
      loadingDispatcher.end();
      formData.password = '';
    });
};

onMounted(() => {
  const localStorageData = AuthUtils.getRememberedAccount();
  if (localStorageData) {
    try {
      const { email, password } = JSON.parse(localStorageData) as RememberedAccountData;
      formData.email = email;
      formData.password = password;
      rememberPassword.value = true;
    } catch {
      window['$message'].error('Some thing went wrong try again');
    }
  }
});

const verifyDomainName = async () => {
  if (isHost !== centralDomain) {
    verifyDomainNameApi(isHost).then((res: any) => {
      if (res?.code === 200) {
        const ex = 7 * 24 * 60 * 60;
        storage.set(TENANT_API_KEY, res?.data.tenant_api_key, ex);
      }
      isLoginButtonDisabled();
    });
  } else {
    storage.remove(TENANT_API_KEY);
  }
};

onBeforeMount(() => verifyDomainName());
</script>

<style lang="scss" scoped>
.login_btn {
  @apply w-full mt-4 py-5 px-4 bg-primary text-white rounded-full shadow hover:bg-info hover:text-white;
}
</style>
