<template>
  <component :is="Component" :resource="resource" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Resource } from "@/schema/schema";
import ImageHandler from "./ImageHandler.vue";
import XmlRawHandler from "./XmlRawHandler.vue";

const props = defineProps<{ resource: Resource }>();

const Component = computed(() => {
  switch (true) {
    case props.resource.mimeType.startsWith("image/"): {
      return ImageHandler;
    }
    case props.resource.mimeType === "application/xml": {
      return XmlRawHandler;
    }
    default: {
      return null;
    }
  }
});
</script>
