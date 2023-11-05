<script setup lang="ts">
import { watchEffect } from "vue";
import { useVModel } from "@vueuse/core";
import { type TModule } from "../../schema/schema.ts";

const props = defineProps<{
  modules: TModule[];
  select: TModule;
}>();

const emit = defineEmits(["update:select"]);

const select = useVModel(props, "select", emit);
</script>

<template>
  <div class="c-module-selector">
    <div class="icon-list">
      <img
        class="icon"
        v-for="(m, i) in modules"
        :key="`${m.icon}_${i}`"
        :src="m.icon"
        :alt="m.name"
        :data-selected="select === m"
        @click="select = m"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.c-module-selector {
  width: 100%;
  height: 100%;
  padding: 10px;
}
.icon-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 10px;
  .icon {
    width: 100%;
    cursor: pointer;
    transform: scale(0.9);
    opacity: 0.5;
    transition: 0.2s ease all;
    &[data-selected="true"] {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
