<template>
  <div class="c-xml-handler">
    <MonacoEditor
      v-model:value="modelValue"
      :options="{ language: 'xml', theme: 'vs-dark' }"
    />
  </div>
</template>
<script setup lang="tsx">
import { ref, watchEffect } from "vue";
import { Resource } from "@/schema/schema.ts";
import MonacoEditor from "../Monaco/Index.vue";

const props = defineProps<{ resource: Resource }>();

const modelValue = ref(props.resource.origin);
watchEffect(() => {
  modelValue.value = props.resource.origin;
});

// watch(modelValue, (value) => {
//   fs.writeFileSync(value)
// });
</script>

<style lang="less" scoped>
.c-xml-handler {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-text-1);
    margin-bottom: 20px;
    .title {
      font-size: 20px;
    }
    .icon {
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>
