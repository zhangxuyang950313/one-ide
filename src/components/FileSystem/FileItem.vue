<template>
  <div>{{ data.name }}</div>
  <template v-if="!!data.children">
    <div v-for="item in data.children" :key="item.path" class="ml-4">
      <FileItem :data="item" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { type DirectoryTree } from "directory-tree";

defineProps<{
  data: DirectoryTree;
}>();
</script>
