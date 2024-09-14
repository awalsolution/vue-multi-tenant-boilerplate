<template>
  <div class="grid grid-cols-4 gap-5">
    <div class="col-span-1">
      <img :src="imgUrl + data?.profile_picture" alt="profile picture" />
    </div>
    <div class="col-span-3 grid grid-cols-2 gap-5">
      <InputText v-model="data.name" disabled placeholder="Name" fluid />
      <InputText v-model="data.email" disabled placeholder="Email" fluid />
      <InputText v-model="data.phone_number" disabled placeholder="Phone Number" fluid />
      <InputText v-model="data.address" disabled placeholder="Address" fluid />
      <InputText v-model="data.city" disabled placeholder="City" fluid />
      <InputText v-model="data.state" disabled placeholder="State" fluid />
      <InputText v-model="data.country" disabled placeholder="State" fluid />
    </div>
    <Button label="Edit" severity="primary" @click="openEditDialog" />
  </div>
  <Dialog v-model:visible="editDialog" modal header="Edit Profile" class="w-1/2">
    <div class="grid grid-cols-2 gap-5">
      <div class="w-full">
        <label for="name" class="font-semibold">Name</label>
        <InputText id="name" v-model="data.name" fluid autocomplete="off" />
      </div>
      <div class="w-full">
        <label for="phone_number" class="font-semibold">Phone Number</label>
        <InputText id="phone_number" v-model="data.phone_number" fluid autocomplete="off" />
      </div>
      <div class="w-full">
        <label for="address" class="font-semibold">Address</label>
        <InputText id="address" v-model="data.address" fluid autocomplete="off" />
      </div>
      <div class="w-full">
        <label for="city" class="font-semibold">City</label>
        <InputText id="city" v-model="data.city" fluid autocomplete="off" />
      </div>
      <div class="w-full">
        <label for="state" class="font-semibold">State</label>
        <InputText id="state" v-model="data.state" fluid autocomplete="off" />
      </div>
      <div class="w-full">
        <label for="country" class="font-semibold">Country</label>
        <InputText id="country" v-model="data.country" fluid autocomplete="off" />
      </div>
    </div>
    <div class="flex gap-6 mt-4 items-start">
      <FileUpload
        mode="basic"
        auto
        severity="primary"
        accept="image/*"
        @upload="onUpload($event)"
        :url="uploadUrl"
        name="image"
      />
      <img
        v-if="previewUrl"
        :src="imgUrl + previewUrl"
        alt="Image"
        class="shadow-md rounded-xl size-16"
      />
    </div>
    <div class="flex justify-end gap-2 mt-4">
      <Button type="button" label="Cancel" severity="info" @click="hideDialog" />
      <Button type="button" label="Save" severity="primary" @click="saveForm" />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useUserStore } from '@src/store/modules/user';
import { updateRecordApi } from '@src/api/endpoints';
import { useEnv } from '@src/hooks/useEnv';
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const { imgUrl, uploadUrl } = useEnv();
const userStore = useUserStore();
const editDialog: Ref = ref(false);
const submitted: Ref = ref({});
const data: Ref = ref({});
const previewUrl = ref(null);

const openEditDialog = () => {
  editDialog.value = true;
  submitted.value = false;
};

function hideDialog() {
  editDialog.value = false;
  submitted.value = false;
}

const saveForm = () => {
  submitted.value = true;
  updateRecordApi(`/users/profile/${data.value.id}`, data.value).then((res: any) => {
    window.toast('success', 'Profile Information', res.message);
  });
  editDialog.value = false;
  data.value = {};
  getProfileDataFromStore();
};

const onUpload = (e: any) => {
  const response = e.xhr.response;
  let res;
  try {
    res = JSON.parse(response);
    data.value.profile_picture = res.data;
    previewUrl.value = res.data;
    window.toast('success', 'Success message', res.message);
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
    return;
  }
};

const getProfileDataFromStore = () => {
  data.value = userStore.currentUser;
};

onMounted(() => {
  getProfileDataFromStore();
});
</script>

<style lang="scss" scoped></style>
