<script setup lang="ts">
import {
  IconApps,
  IconMobile,
  IconMenu,
  IconExport,
  IconSend,
  IconInfoCircle,
} from "@arco-design/web-vue/es/icon";
import { storeToRefs } from "pinia";
import { useToolbarStore } from "@/store/useToolbar";
import IconButton from "./ui/IconButton.vue";

const toolbarStore = useToolbarStore();
const { panelVisible } = storeToRefs(toolbarStore);
</script>

<template>
  <div class="toolbar-container">
    <div>
      <IconButton
        class="button"
        name="模块"
        v-model:active="panelVisible.module"
      >
        <IconApps class="icon" />
      </IconButton>
      <IconButton class="button" name="页面" v-model:active="panelVisible.view">
        <IconMenu class="icon" />
      </IconButton>
      <IconButton
        class="button"
        name="预览"
        v-model:active="panelVisible.preview"
      >
        <IconMobile class="icon" />
      </IconButton>
    </div>
    <div>
      <IconButton class="button" name="信息">
        <IconInfoCircle class="icon" />
      </IconButton>
      <IconButton class="button" name="应用">
        <IconSend class="icon" />
      </IconButton>
      <IconButton class="button" name="导出">
        <IconExport class="icon" />
      </IconButton>
    </div>
  </div>
</template>

<style lang="less" scoped>
.toolbar-container {
  width: 100%;
  height: 100%;
  padding: 10px 10px 10px 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .button {
    margin-right: 10px;
  }
  .icon {
    font-size: 15px;
  }
}
</style>
