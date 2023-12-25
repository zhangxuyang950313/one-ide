<template>
  <Spin :loading="!imgSrc">
    <img :src="imgSrc" />
  </Spin>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Spin } from "@arco-design/web-vue";

const props = defineProps<{
  src: string;
}>();

const imgSrc = ref();

const image = new Image();
image.onload = () => {
  imgSrc.value = props.src;
};
image.src = props.src;
</script>
