<template>
  <div>
    <n-card title="Add New Tenant">
      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
        <h3 class="underline px-1 pb-4 text-xl">General Info</h3>
        <n-row :gutter="[20, 8]">
          <n-col :span="12">
            <n-form-item label="Plan Price" path="plan_id">
              <n-select
                :filterable="true"
                :tag="false"
                placeholder="Select Plan"
                v-model:value="formValue.plan_id"
                clearable
                @focus="getPlansOnFocus"
                :remote="true"
                :clear-filter-after-select="false"
                label-field="name"
                value-field="id"
                :loading="planLoading"
                :options="plans"
              />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Domain Name" path="domain_name">
              <n-input v-model:value="formValue.domain_name" placeholder="Enter Domain Name" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="First Name" path="first_name">
              <n-input v-model:value="formValue.first_name" placeholder="Enter First Name" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Last Name" path="last_name">
              <n-input v-model:value="formValue.last_name" placeholder="Enter Last Name" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Email" path="email">
              <n-input v-model:value="formValue.email" placeholder="Enter Email" type="email" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Phone Number" path="phone_number">
              <n-input v-model:value="formValue.phone_number" placeholder="Enter Phone Number" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Password" path="password">
              <n-input
                v-model:value="formValue.password"
                placeholder="Enter Password"
                type="password"
                showPasswordOn="click"
              />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Password Confirm" path="password_confirmation">
              <n-input
                v-model:value="formValue.password_confirmation"
                placeholder="Enter Password"
                type="password"
                showPasswordOn="click"
              />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="status" path="status">
              <n-switch v-model:value="formValue.status" :checked-value="1" :unchecked-value="0" />
            </n-form-item>
          </n-col>
          <n-space :verical="true" item-class="w-full">
            <n-card title="Roles">
              <n-checkbox-group v-model:value="formValue.roles">
                <n-row>
                  <n-col v-for="role of roles" :key="role.id" :span="6">
                    <n-checkbox :value="role.name" :label="role.name" />
                  </n-col>
                </n-row>
              </n-checkbox-group>
            </n-card>

            <n-card title="Permissions">
              <n-checkbox-group class="mx-2" v-model:value="formValue.permissions">
                <n-row>
                  <n-col v-for="permission of permissions" :key="permission.id" :span="6">
                    <n-checkbox :value="permission.name" :label="permission.name" />
                  </n-col>
                </n-row>
              </n-checkbox-group>
            </n-card>
          </n-space>
        </n-row>

        <n-space justify="end">
          <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
            <n-button secondary type="info" @click="handleValidateClick"> Save </n-button>
          </n-form-item>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { type FormInst } from 'naive-ui';
import { createRecordApi } from '@src/api/endpoints';
import { usePlanfilter } from '@src/filters/plan';
import { useRolefilter } from '@src/filters/role';
import { usePermissionfilter } from '@src/filters/permission';
import { formRules } from '@src/rules/tenant';

const router = useRouter();
const formRef = ref<FormInst | null>(null);
const { plans, planLoading, getPlansOnFocus } = usePlanfilter();
const { permissions, getPermissions } = usePermissionfilter();
const { roles, getRoles } = useRolefilter();

const formValue: Ref = ref({
  permissions: [],
  roles: []
});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    console.log('after ssss', formValue);
    if (!errors) {
      createRecordApi('/tenant', formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        router.push({
          name: 'tenant_list'
        });
        // emits('created', res.data);
      });
    } else {
      console.log(errors);
      window['$message'].error('Please fill out required fields');
    }
  });
};

onMounted(() => {
  getRoles();
  getPermissions();
});
</script>

<style lang="scss" scoped></style>
