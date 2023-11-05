<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Tabs } from "@arco-design/web-vue";
import ResourceList from "./ResourceList.vue";
import { useIdeStateStore } from "../../store/useIdeStateStore.ts";

defineOptions({ name: "ViewResource" });

const ideStateStore = useIdeStateStore();
const {
  resourceCategories, //
  pageSelected,
} = storeToRefs(ideStateStore);
</script>

<template>
  <Tabs class="tabs">
    <Tabs.TabPane
      v-for="category in resourceCategories"
      :key="category.key"
      :title="category.name"
    >
      <ResourceList
        v-if="pageSelected"
        :elements="
          (pageSelected.resources || []).filter(
            (resource) => resource.categoryKey === category.key,
          )
        "
      />
    </Tabs.TabPane>
  </Tabs>
</template>
