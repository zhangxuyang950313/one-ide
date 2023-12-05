<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Tabs } from "@arco-design/web-vue";

import ResourceList from "./ResourceList.vue";

import { useIdeStateStore } from "@/store/useIdeStateStore.ts";

defineOptions({ name: "ViewResource" });

const ideStateStore = useIdeStateStore();
const {
  // resourceGroups, //
  resourceCategories,
  selectView,
} = storeToRefs(ideStateStore);
</script>

<template>
  <Tabs class="tabs" animation lazy-load justify>
    <Tabs.TabPane
      v-for="(category, key) in resourceCategories"
      :key="key"
      :title="category.name"
    >
      <ResourceList
        class="list"
        v-if="selectView"
        :resourceGroups="selectView.resources[category.key] || []"
      />
    </Tabs.TabPane>
  </Tabs>
</template>

<style lang="less" scoped>
.tabs {
  width: 100%;
  overflow: hidden;

  :deep(.arco-tabs-pane) {
    width: 100%;
    overflow: hidden;
  }
  :deep(.arco-tabs-content-item) {
    padding: 0;
    overflow: auto;
  }
}
.list {
  display: inline-flex;
  //width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
