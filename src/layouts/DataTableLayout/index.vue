<template>
  <div class="flex h-[calc(100%-144px)] flex-col overflow-y-scroll">
    <slot name="header"></slot>

    <slot name="content"></slot>

    <slot name="footer"></slot>
  </div>
</template>

<style scoped lang="scss"></style>
