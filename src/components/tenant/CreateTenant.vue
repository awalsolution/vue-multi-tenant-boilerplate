<template>
  <Card>
    <template #title><b class="text-xl">Add Organization</b></template>
    <template #content>
      <Divider
        align="center"
        type="dotted"
        :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '2rem 0' } }"
      >
        <b class="text-xl">Organization Information</b>
      </Divider>
      <div class="grid grid-cols-3 gap-5">
        <div class="w-full">
          <label for="tenant_name" class="block font-semibold mb-1">Name</label>
          <InputText
            id="tenant_name"
            v-model="data.tenant_name"
            fluid
            autocomplete="off"
            placeholder="Name"
          />
        </div>
        <div class="w-full">
          <label for="domain_name" class="block font-semibold mb-1">Domain Name</label>
          <InputText
            id="domain_name"
            v-model="data.domain_name"
            fluid
            autocomplete="off"
            placeholder="Domain Name"
          />
        </div>
        <div class="w-full">
          <label for="phone_number" class="block font-semibold mb-1">Phone#</label>
          <InputText
            id="phone_number"
            v-model="data.phone_number"
            fluid
            autocomplete="off"
            placeholder="Phone#"
          />
        </div>
        <div class="w-full">
          <label for="address" class="block font-semibold mb-1">Address</label>
          <InputText
            id="address"
            v-model="data.address"
            fluid
            autocomplete="off"
            placeholder="Address"
          />
        </div>
        <div class="w-full">
          <label for="city" class="block font-semibold mb-1">City</label>
          <InputText id="city" v-model="data.city" fluid autocomplete="off" placeholder="City" />
        </div>
        <div class="w-full">
          <label for="state" class="block font-semibold mb-1">State</label>
          <InputText id="state" v-model="data.state" fluid autocomplete="off" placeholder="State" />
        </div>
        <div class="w-full">
          <label for="country" class="block font-semibold mb-1">Country</label>
          <InputText
            id="country"
            v-model="data.country"
            fluid
            autocomplete="off"
            placeholder="Country"
          />
        </div>
        <div class="w-full">
          <label for="status" class="block font-semibold mb-1">Status</label>
          <ToggleSwitch id="status" v-model="data.status" :true-value="1" :false-value="0" />
        </div>
      </div>
      <Divider
        align="center"
        type="dotted"
        :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '2rem 0' } }"
      >
        <b class="text-xl">Organization Admin User Information</b>
      </Divider>
      <div class="grid grid-cols-3 gap-5">
        <div class="w-full">
          <label for="name" class="block font-semibold mb-1">Name</label>
          <InputText id="name" v-model="data.name" fluid autocomplete="off" placeholder="Name" />
        </div>
        <div class="w-full">
          <label for="email" class="block font-semibold mb-1">Email</label>
          <InputText id="email" v-model="data.email" fluid autocomplete="off" placeholder="Email" />
        </div>
        <div class="w-full">
          <label for="password" class="block font-semibold mb-1">Password</label>
          <Password
            id="password"
            v-model="data.password"
            placeholder="Password"
            toggleMask
            fluid
            autocomplete="off"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-3 justify-end">
        <Button label="Cancel" severity="danger" @click="handleCancel" />
        <Button label="Save" @click="saveForm" />
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { createRecordApi } from '@src/api/endpoints';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import ToggleSwitch from 'primevue/toggleswitch';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Card from 'primevue/card';

const router = useRouter();
const data: Ref = ref({});

const saveForm = () => {
  createRecordApi('/tenants', data.value).then((res: any) => {
    window.toast('success', 'Organization Information', res.message);
    router.push({ name: 'organization_list' });
  });
  data.value = {};
};

const handleCancel = () => {
  router.push({ name: 'organization_list' });
};
</script>

<style lang="scss" scoped></style>
