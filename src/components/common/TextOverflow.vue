<template>
  <Tooltip
    :popup-visible="popupVisible"
    content-class="whitespace-nowrap w-max !max-w-max"
    @update:popup-visible="(v) => isEllipsis && (popupVisible = v)"
  >
    <div
      ref="contentRef"
      class="whitespace-nowrap overflow-hidden text-ellipsis"
    >
      <slot />
    </div>
    <template #content>
      <div class="whitespace-break-spaces">
        <slot name="content" />
      </div>
    </template>
  </Tooltip>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Tooltip } from "@arco-design/web-vue";

const contentRef = ref<HTMLDivElement>();
const isEllipsis = computed(() => {
  if (!contentRef.value) return false;
  return contentRef.value.scrollWidth > contentRef.value.clientWidth;
});

const popupVisible = ref(false);
</script>
