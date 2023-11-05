<script setup lang="ts">
import Preview from "./Preview.vue";
import { useIdeStateStore } from "../../store/useIdeStateStore.ts";
import { storeToRefs } from "pinia";
defineOptions({ name: "ViewPreview" });

const ideStateStore = useIdeStateStore();
const { pageSelected } = storeToRefs(ideStateStore);
</script>

<template>
  <div>
    <Preview :preview="pageSelected.preview" />
  </div>
</template>
