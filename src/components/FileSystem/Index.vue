<template>
  <div class="w-full">
    <p>{{ dirTree.name }}</p>
    <Tree
      v-if="dirTree.children"
      :data="dirTree.children"
      :field-names="fieldNames"
      show-line
    >
      <template #switcher-icon="node, { isLeaf }">
        <IconDown v-if="!isLeaf" />
        <div v-if="isLeaf">○</div>
      </template>
    </Tree>
  </div>
</template>

<script setup lang="tsx">
import { watchEffect, computed, VNode } from "vue";
import { Tree, type TreeFieldNames } from "@arco-design/web-vue";
import { IconFile, IconFolder } from "@arco-design/web-vue/es/icon";
import { DirectoryTree } from "directory-tree";
import { useDirTree } from "@/use/useDirTree";

const { data } = useDirTree();

const fieldNames: TreeFieldNames = {
  key: "path",
  title: "name",
};

watchEffect(() => {
  console.log("data", data.value);
});

const dirTree = computed(() => {
  function addIcon(
    item: DirectoryTree,
  ): DirectoryTree & { icon?: () => VNode } {
    if (item.children) {
      return {
        ...item,
        icon: () => <IconFolder />,
        children: item.children.map(addIcon),
      };
    }
    return {
      ...item,
      icon: () => <IconFile />,
    };
  }
  return addIcon(data.value);
});
</script>
