<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { Radio } from "@arco-design/web-vue";
import { useIdeStateStore } from "@/store/useIdeStateStore.ts";
import ResourcePreviewList from "./ResourcePreviewList.vue";
import ResourceHandler from "./ResourceHandler.vue";

defineOptions({ name: "ViewResource" });

const ideStateStore = useIdeStateStore();
const { selectView } = storeToRefs(ideStateStore);

const selectKey = ref(Infinity);

watchEffect(() => {
  const resources = selectView.value?.resources || [];
  if (
    Array.isArray(resources) &&
    resources.length > 0 &&
    selectKey.value === Infinity
  ) {
    selectKey.value = 0;
  }
});
</script>

<template>
  <div class="c-resource-container" v-if="selectView">
    <Radio.Group
      v-model="selectKey"
      class="select-radios"
      type="button"
      size="large"
    >
      <Radio
        v-for="(item, key) in selectView.resources"
        :key="key"
        :value="key"
        class="select-radio"
      >
        {{ item.name }}
      </Radio>
    </Radio.Group>
    <template v-for="(item, key) in selectView.resources" :key="key">
      <div class="resource-content" v-show="selectKey === key">
        <ResourcePreviewList
          v-if="item.use === 'file-list'"
          class="list"
          :list="item.resources"
        />
        <ResourceHandler
          v-else-if="item.use === 'file'"
          class="file"
          :resource="item.resource"
        />
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.c-resource-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.select-radios {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  .select-radio {
    flex-shrink: 0;
  }
}
.resource-content {
  flex-grow: 1;
  overflow: hidden;
  width: 100%;
}
.file {
  height: 100%;
}
.list {
  display: inline-flex;
  padding: 20px;
  height: 100%;
  overflow: auto;
}
</style>
