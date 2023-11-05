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
  outline: 2px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  font-size: 0;
  .static {
    width: 100%;
    object-fit: contain;
  }
}
</style>
