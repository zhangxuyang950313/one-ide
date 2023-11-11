<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useIdeStateStore } from "@/store/useIdeStateStore.ts";
import Selector from "./Selector.vue";

defineOptions({ name: "ModuleSelector" });

const ideStateStore = useIdeStateStore();
const { modules, selectModule } = storeToRefs(ideStateStore);
</script>

<template>
  <Selector :modules="modules" v-model:select="selectModule" />
</template>
