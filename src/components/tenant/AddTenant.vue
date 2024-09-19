<template>
  <Card>
    <template #content>
      <Divider
        align="center"
        type="dotted"
        :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '0 0 2rem 0' } }"
      >
        <b class="text-xl">Add Organization</b>
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
          <label for="email" class="block font-semibold mb-1">Email</label>
          <InputText id="email" v-model="data.email" fluid autocomplete="off" placeholder="Email" />
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
          <label for="plan_id" class="block font-bold mb-3">Select Plan</label>
          <Select
            id="plan_id"
            v-model="data.plan_id"
            :options="plans"
            option-label="name"
            option-value="id"
            placeholder="Select Plan"
            class="w-full"
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
import { onMounted, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { createRecordApi } from '@src/api/endpoints';
import { usePlanfilter } from '@src/filters/plan';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Card from 'primevue/card';

const router = useRouter();
const { plans, getPlans } = usePlanfilter();
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
onMounted(() => {
  getPlans();
});
</script>

<style lang="scss" scoped></style>
