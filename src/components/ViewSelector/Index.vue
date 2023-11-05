<script setup lang="ts">
import { watch, watchEffect, nextTick } from "vue";
import { storeToRefs } from "pinia";
import Selector from "./Selector.vue";
import { TModule, TView } from "../../schema/schema.ts";
import { useIdeStateStore } from "../../store/useIdeStateStore.ts";

defineOptions({ name: "ViewSelector" });

const memoryMap = new Map<TModule, TView>();

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
  <Selector :pages="pagesBySelectedModule" v-model:select="pageSelected" />
</template>
