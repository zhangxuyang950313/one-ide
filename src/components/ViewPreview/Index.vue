<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useIdeStateStore } from "@/store/useIdeStateStore.ts";
import Preview from "./Preview.vue";

defineOptions({ name: "ViewPreview" });

const ideStateStore = useIdeStateStore();
const { selectView } = storeToRefs(ideStateStore);
</script>

<template>
  <div>
    <Preview v-if="selectView" :preview="selectView.preview" />
  </div>
</template>
