<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Step-by-step form">
        Break a lengthy or unfamiliar form task into steps and guide users through it.
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <n-space vertical class="steps" justify="center">
        <n-steps :current="currentTab" :status="currentStatus">
          <n-step
            title="Fill in the transfer information"
            description="Make sure to fill in the correct information"
          />
          <n-step title="Confirm transfer information" description="Confirm transfer information" />
          <n-step
            title="Transfer completed"
            description="Congratulations, the transfer is successful"
          />
        </n-steps>
        <step1 v-if="currentTab === 1" @nextStep="nextStep" />
        <step2 v-if="currentTab === 2" @nextStep="nextStep" @prevStep="prevStep" />
        <step3 v-if="currentTab === 3" @prevStep="prevStep" @finish="finish" />
      </n-space>
    </n-card>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import step1 from './Step1.vue';
  import step2 from './Step2.vue';
  import step3 from './Step3.vue';

  const currentTab = ref(1);
  const currentStatus = ref('process');

  function nextStep() {
    if (currentTab.value < 3) {
      currentTab.value += 1;
    }
  }

  function prevStep() {
    if (currentTab.value > 1) {
      currentTab.value -= 1;
    }
  }

  function finish() {
    currentTab.value = 1;
  }
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
</style>
