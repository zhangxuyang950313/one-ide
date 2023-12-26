<template>
  <div class="w-full h-full flex flex-col">
    <MonacoEditor
      v-if="value"
      :value="value"
      :options="{ language: 'xml', theme: 'vs-dark', autoIndent: 'full' }"
      @update:value="handleUpdateValue"
    />
  </div>
</template>
<script setup lang="tsx">
import { useRequest } from "alova";
import { computed } from "vue";
import { Resource } from "@/schema/schema";
import { serviceGetProjectFile, serviceWriteFile } from "@/service/file";
import { useStorageData } from "@/use/useStorageData";
import MonacoEditor from "../Monaco/Index.vue";

const props = defineProps<{ resource: Resource }>();

const storageData = useStorageData();

const { data } = useRequest(() =>
  serviceGetProjectFile(props.resource.release[0]),
);

const value = computed(() =>
  typeof data.value === "string" ? data.value : "",
);

async function handleUpdateValue(v: string) {
  const queue = props.resource.release.map((rel) => {
    return serviceWriteFile({
      content: v,
      to: `${storageData.editor.value.current}/${rel}`,
    }).send();
  });
  await Promise.all(queue);
}
</script>
