<script setup lang="ts">
import { watch, watchEffect, nextTick } from "vue";
import { storeToRefs } from "pinia";
import PageSelector from "./Selector.vue";
import { TModule, TPage } from "../../schema/schema.ts";
import { useIdeStateStore } from "../../store/useIdeStateStore.ts";

defineOptions({ name: "PageSelector" });

const memoryMap = new Map<TModule, TPage>();

const ideState = useIdeStateStore();
const {
  moduleSelected, //
  pageSelected,
  pagesBySelectedModule,
} = storeToRefs(ideState);

watchEffect(() => {
  if (!pageSelected.value) return;
  nextTick(() => {
    memoryMap.set(moduleSelected.value, pageSelected.value);
  });
});

watch(
  moduleSelected,
  (v) => {
    const p = memoryMap.get(v);
    if (p) pageSelected.value = p;
    else pageSelected.value = pagesBySelectedModule.value[0];
  },
  { immediate: true },
);
</script>

<template>
  <PageSelector :pages="pagesBySelectedModule" v-model:select="pageSelected" />
</template>
