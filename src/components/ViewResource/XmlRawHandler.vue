<template>
  <div class="w-full h-full flex flex-col">
    <MonacoEditor
      v-if="value"
      :value="value"
      :options="{ language: 'xml', theme: 'vs-dark' }"
    />
  </div>
</template>
<script setup lang="tsx">
import { useRequest } from "alova";
import { computed } from "vue";
import { Resource } from "@/schema/schema.ts";
import { serviceGetProjectFile } from "@/service/file";
import MonacoEditor from "../Monaco/Index.vue";

const props = defineProps<{ resource: Resource }>();

const { data } = useRequest(() =>
  serviceGetProjectFile(props.resource.release[0]),
);

const value = computed(() =>
  typeof data.value === "string" ? data.value : "",
);
</script>
