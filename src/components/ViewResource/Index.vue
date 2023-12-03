<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Tabs } from "@arco-design/web-vue";
import { useIdeStateStore } from "@/store/useIdeStateStore.ts";
import FileList from "./FileList.vue";

defineOptions({ name: "ViewResource" });

const ideStateStore = useIdeStateStore();
const { selectView } = storeToRefs(ideStateStore);
</script>

<template>
  <Tabs v-if="selectView" class="tabs" justify>
    <Tabs.TabPane
      v-for="(item, key) in selectView.resources"
      :key="key"
      :title="item.name"
    >
      <FileList
        v-if="item.use === 'file-list'"
        class="list"
        :list="item.resources"
      />
      <FileList
        v-else-if="item.use === 'file'"
        class="list"
        :list="[{ title: '', resources: [item.resource] }]"
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
}
:deep(.arco-tabs-content) {
  padding: 0;
}
.list {
  display: inline-flex;
  //width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
