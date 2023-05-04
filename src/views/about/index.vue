<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="About">
        {{ name }} is based on vue3, vite2, TypeScript The middle and back office solutions, which
        can help you quickly build enterprise-level middle and back office projects, believe that
        whether it is from the use of new technologies or other aspects, it can help you and
        continue to update.
      </n-card>
    </div>
    <n-card
      :bordered="false"
      title="Project Information"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-descriptions bordered label-placement="left" class="py-2">
        <n-descriptions-item label="version">
          <n-tag type="info"> {{ version }} </n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="last compilation time">
          <n-tag type="info"> {{ lastBuildTime }} </n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="Document Address">
          <div class="flex items-center">
            <a href="https://docs.naiveadmin.com" class="py-2" target="_blank"
              >View document address</a
            >
          </div>
        </n-descriptions-item>
        <n-descriptions-item label="Preview address">
          <div class="flex items-center">
            <a href="https://v1.naiveadmin.com" class="py-2" target="_blank"
              >View preview address</a
            >
          </div>
        </n-descriptions-item>
        <n-descriptions-item label="Github">
          <div class="flex items-center">
            <a href="https://github.com/jekip/naive-ui-admin" class="py-2" target="_blank"
              >View Github address</a
            >
          </div>
        </n-descriptions-item>
        <n-descriptions-item label="QQ exchange group">
          <div class="flex items-center">
            <a href="https://jq.qq.com/?_wv=1027&k=xib9dU4C" class="py-2" target="_blank"
              >Click the link to join the group chat 【Naive Admin】</a
            >
          </div>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card
      :bordered="false"
      title="Development environment dependencies"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-descriptions bordered label-placement="left" class="py-2">
        <n-descriptions-item v-for="item in devSchema" :key="item.field" :label="item.field">
          {{ item.label }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card
      :bordered="false"
      title="Production Environment Dependency"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-descriptions bordered label-placement="left" class="py-2">
        <n-descriptions-item v-for="item in schema" :key="item.field" :label="item.field">
          {{ item.label }}
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  export interface schemaItem {
    field: string;
    label: string;
  }

  const { pkg, lastBuildTime } = __APP_INFO__;
  const { dependencies, devDependencies, name, version } = pkg;

  const schema: schemaItem[] = [];
  const devSchema: schemaItem[] = [];

  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: dependencies[key] });
  });

  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: devDependencies[key] });
  });
</script>

<style lang="less" scoped></style>
