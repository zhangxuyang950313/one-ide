<script setup lang="ts">
// import { watch, watchEffect, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useIdeStateStore } from "@/store/useIdeStateStore.ts";
import Selector from "./Selector.vue";

// import { Module, View } from "@/schema/schema";

defineOptions({ name: "ViewSelector" });

// const memoryMap = new Map<Module, View>();

const ideState = useIdeStateStore();
const {
  views,
  // selectModule, //
  selectView,
} = storeToRefs(ideState);

// watchEffect(() => {
//   if (!selectView.value) return;
//   nextTick(() => {
//     if (selectModule.value && selectView.value) {
//       memoryMap.set(selectModule.value, selectView.value);
//     }
//   });
// });
//
// watch(
//   selectModule,
//   (v) => {
//     if (!v) return;
//     const p = memoryMap.get(v);
//     if (p) selectView.value = p;
//     else selectView.value = views.value[0];
//   },
//   { immediate: true },
// );
</script>

<template>
  <Selector :pages="views" v-model:select="selectView" />
</template>
