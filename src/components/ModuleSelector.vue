<script setup lang="ts">
import { type TModule } from "../schema/schema.ts";

defineProps<{
  modules: TModule[];
}>();
</script>

<template>
  <div class="module-selector">
    <div class="icon-list">
      <img
        class="icon"
        v-for="(m, i) in modules"
        :key="`${m.icon}_${i}`"
        :src="m.icon"
        :alt="m.name"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.module-selector {
  width: 100%;
  height: 100%;
  padding: 10px;
}
.icon-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: 10px;
  .icon {
    width: 100%;
    cursor: pointer;
  }
}
</style>
