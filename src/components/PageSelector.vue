<script setup lang="ts">
import { TPage } from "../schema/schema.ts";

defineProps<{
  pages: TPage[];
}>();
</script>

<template>
  <div class="page-selector-container">
    <div class="page-list">
      <div
        class="page-wrapper"
        v-for="(item, k) in pages"
        :key="`${item.preview}_${k}`"
      >
        <img class="preview" :src="item.preview" :alt="item.name" />
        <span class="title">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-selector-container {
  width: 100%;
  .page-list {
    width: 100%;
    .page-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      .title {
        margin-top: 4px;
        font-size: 12px;
        color: var(--color-text-2);
      }
      .preview {
        width: 100%;
        border-radius: 8px;
      }
    }
  }
}
</style>
