<script setup lang="ts">
import { TResource, TResourceCategory } from "../schema/schema.ts";
import { computed } from "vue";

const props = defineProps<{
  category: TResourceCategory;
  resources: TResource[];
}>();

const resources = computed(() =>
  props.resources.filter((item) => item.categoryKey === props.category.key),
);
</script>

<template>
  <div class="main">
    <div v-for="(item, i) in resources" :key="`${item.paths}_${i}`">
      <span style="color: black">{{ item }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
