<script lang="ts" setup>
import { TResource } from "../../schema/schema.ts";

defineProps<{
  resource: TResource;
}>();
</script>

<template>
  <div class="c-image-handler">
    <img class="origin" :src="resource.origin" alt="" />
  </div>
</template>

<style lang="less" scoped>
.c-image-handler {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: url("../../assets/image-handler-bg.svg") no-repeat center/100%;
  border-radius: 6px;
  .origin {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
}
</style>
