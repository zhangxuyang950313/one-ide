<script setup lang="ts">
defineProps<{
  preview: string;
}>();
</script>

<template>
  <div class="preview">
    <img class="static" :src="preview" alt="预览" />
  </div>
</template>

<style lang="less" scoped>
.preview {
  width: 100%;
  height: 100%;
  .static {
    width: 100%;
    object-fit: contain;
  }
}
</style>
