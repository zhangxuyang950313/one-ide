<script setup lang="ts">
import { TView } from "../../schema/schema.ts";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  pages: TView[];
  select?: TView;
}>();

const emit = defineEmits(["update:select"]);

const select = useVModel(props, "select", emit);
</script>

<template>
  <div class="c-view-selector">
    <div class="view-list">
      <div
        class="view-wrapper"
        v-for="(p, i) in pages"
        :key="`${p.preview}_${i}`"
        :data-selected="select === p"
        @click="select = p"
      >
        <img
          class="preview"
          :src="p.preview"
          :alt="p.name"
          :data-selected="select === p"
        />
        <span class="title" :data-selected="select === p">{{ p.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.c-view-selector {
  width: 100%;
  .view-list {
    width: 100%;
    .view-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;
      transition: 0.2s all;
      opacity: 0.8;
      border-radius: 6px;
      &[data-selected="true"] {
        opacity: 1;
      }
      .title {
        margin: 6px 0;
        font-size: 12px;
        color: var(--color-text-2);

        &[data-selected="true"] {
          color: var(--color-primary-light-4);
          font-weight: bold;
        }
      }
      .preview {
        width: 100%;
        border-radius: 6px;
        outline: 2px solid var(--color-border);
        object-fit: contain;
        &[data-selected="true"] {
          opacity: 1;
          outline: 2px solid var(--color-primary-light-4);
        }
      }
    }
  }
}
</style>
