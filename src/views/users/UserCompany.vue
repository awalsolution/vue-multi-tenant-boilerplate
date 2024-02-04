<template>
  <ContentLayout v-if="isSuperAdminUser()">
    <n-card title="Company Setting" class="h-full overflow-y-scroll">
      <n-row>
        <n-col :span="8" class="text-center">
          <n-avatar round :size="200" :src="`${imgUrl}${formValue.logo}`" />
        </n-col>
        <n-col :span="16">
          <n-space style="display: block" vertical>
            <n-card title="Company Details">
              <n-row gutter="12">
                <n-col :span="8">
                  <n-form-item label="Compant Name" path="company_name">
                    <n-input
                      v-model:value="formValue.compant_name"
                      placeholder="Enter Name"
                      disabled
                    />
                  </n-form-item>
                </n-col>
                <n-col :span="8">
                  <n-form-item label="Company Phone" path="phone_number">
                    <n-input
                      v-model:value="formValue.phone_number"
                      placeholder="Enter Phone"
                      disabled
                    />
                  </n-form-item>
                </n-col>
                <n-col :span="8">
                  <n-form-item label="Status" path="status">
                    <n-switch
                      v-model:value="formValue.status"
                      :checked-value="1"
                      :unchecked-value="0"
                      disabled
                    />
                  </n-form-item>
                </n-col>
                <n-col :span="8">
                  <n-form-item label="Address" path="address">
                    <n-input
                      v-model:value="formValue.address"
                      placeholder="Enter Address"
                      disabled
                    />
                  </n-form-item>
                </n-col>
                <n-col :span="8">
                  <n-form-item label="City" path="city">
                    <n-input v-model:value="formValue.city" placeholder="Enter City" disabled />
                  </n-form-item>
                </n-col>
                <n-col :span="8">
                  <n-form-item label="State" path="state">
                    <n-input v-model:value="formValue.state" placeholder="Enter State" disabled />
                  </n-form-item>
                </n-col>
                <n-col :span="8">
                  <n-form-item label="Country" path="country">
                    <n-input
                      v-model:value="formValue.country"
                      placeholder="Enter Country"
                      disabled
                    />
                  </n-form-item>
                </n-col>
              </n-row>
            </n-card>
          </n-space>
          <n-space justify="end">
            <n-form-item
              :theme-overrides="{
                labelHeightSmall: '0',
                feedbackHeightSmall: '0'
              }"
            >
              <n-button secondary type="info" @click="handleValidateClick">Edit Company</n-button>
            </n-form-item>
          </n-space>
        </n-col>
      </n-row>

      <n-modal style="width: 70%" v-model:show="showEditModal" preset="dialog">
        <template #header>
          <div>Edit Company</div>
        </template>
        <n-space :vertical="true">
          <edit-company @updated="showEditModal = false" />
        </n-space>
      </n-modal>
    </n-card>
  </ContentLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@src/store/modules/user';
import { useEnv } from '@src/hooks/useEnv';
import { isSuperAdminUser } from '@src/checks/isSuperAdmin';
import ContentLayout from '@src/layouts/ContentLayout/index.vue';
import EditCompany from '@src/views/users/EditCompany.vue';

const { imgUrl } = useEnv();
const userStore = useUserStore();
const showEditModal = ref(false);
const formValue: any = ref({});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  showEditModal.value = true;
};

console.log(formValue);

onMounted(() => {
  formValue.value = userStore.currentUser.company;
});
</script>

<style lang="scss" scoped></style>
