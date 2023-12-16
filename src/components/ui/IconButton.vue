<script setup lang="ts">
import { watchEffect } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "按钮",
  },
  active: {
    type: Boolean,
    default: null,
  },
});

defineEmits({
  click: () => true,
  "update:active": (_v: boolean) => true,
});

watchEffect(() => {
  console.log(props.active);
});
</script>

<template>
  <div
    class="c-icon-button"
    :data-active="active"
    @click="$emit('update:active', !active)"
  >
    <div class="icon-bg">
      <div class="icon">
        <slot />
      </div>
    </div>
    <span class="name">{{ name }}</span>
  </div>
</template>

<style lang="less" scoped>
.c-icon-button {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &[data-active="true"] {
    .icon-bg {
      background-color: rgb(var(--primary-6));
      transition: 0.2s all;
    }
  }
  &:not([data-active]) {
    &:hover {
      opacity: 0.8;
      transition: 0.2s all;
    }
  }
  .icon-bg {
    width: 46px;
    height: 26px;
    border-radius: 3px;
    background-color: var(--color-border-2);
    position: relative;
    overflow: hidden;
    transition: 0.2s all;
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .name {
    color: var(--color-border-5);
    margin-top: 6px;
    font-size: 12px;
  }
}
</style>
