<script setup lang="ts">
import { storeToRefs } from "pinia";
import Selector from "./Selector.vue";
import { useIdeStateStore } from "../../store/useIdeStateStore.ts";

defineOptions({ name: "ModuleSelector" });

const ideStateStore = useIdeStateStore();
const { modules, moduleSelected } = storeToRefs(ideStateStore);
</script>

<template>
  <Selector :modules="modules" v-model:select="moduleSelected" />
</template>
