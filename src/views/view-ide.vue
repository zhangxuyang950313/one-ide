<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Empty } from "@arco-design/web-vue";
import { useToolbarStore } from "@/store/useToolbar";
import { useIdeStateStore } from "@/store/useIdeStateStore.ts";
import ToolBar from "@/components/ToolBar.vue";
import ModuleSelector from "@/components/ModuleSelector/Index.vue";
import ViewSelector from "@/components/ViewSelector/Index.vue";
import ViewPreview from "@/components/ViewPreview/Index.vue";
import ViewResource from "@/components/ViewResource/Index.vue";
// import FileSystem from "@/components/FileSystem/Index.vue";

const ideStateStore = useIdeStateStore();
const toolbarStore = useToolbarStore();
const { panelVisible } = storeToRefs(toolbarStore);
</script>

<template>
  <main class="main-container">
    <!-- 顶部 -->
    <section class="upper">
      <ToolBar />
    </section>
    <!-- 下方 -->
    <section class="under">
      <!-- 模块选择器 -->
      <section v-show="panelVisible.module" class="module-selector">
        <ModuleSelector />
      </section>
      <!-- 模块内容编辑 -->
      <section class="module-content">
        <template v-if="!!ideStateStore.modules">
          <!-- 页面选择器 -->
          <ViewSelector v-show="panelVisible.view" class="view-selector" />
          <!-- 页面预览 -->
          <ViewPreview v-show="panelVisible.preview" class="view-preview" />
          <!-- 页面内容编辑 -->
          <ViewResource class="view-resource" />
        </template>
        <template v-else>
          <Empty class="empty" description="未选择模块" />
        </template>
        <!-- 文件管理器 -->
        <!-- <section class="file-system">
          <FileSystem />
        </section> -->
      </section>
    </section>
  </main>
</template>

<style lang="less" scoped>
.main-container {
  background-color: var(--color-bg-1);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .upper {
    width: 100vw;
    min-height: 60px;
    flex-shrink: 0;
    border-bottom: 1px solid var(--color-border-2);
  }

  .under {
    display: flex;
    flex-grow: 1;
    overflow: hidden;

    .module-selector {
      width: 60px;
      height: 100%;
      flex-shrink: 0;
      border-right: 1px solid var(--color-border-2);
    }

    .module-content {
      flex-grow: 1;
      position: relative;
      display: flex;
      width: 100%;
      overflow: hidden;

      .empty {
        position: absolute;
        width: auto;
        padding: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .view-selector {
        width: 160px;
        height: 100%;
        padding: 10px;
        flex-shrink: 0;
        border-right: 1px solid var(--color-border-2);
        overflow: auto;
      }

      .view-preview {
        width: 300px;
        height: 100%;
        padding: 15px;
        flex-shrink: 0;
        border-right: 1px solid var(--color-border-2);
        overflow: auto;
      }

      .view-resource {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .file-system {
        padding: 10px;
        width: 500px;
        overflow: auto;
        border-left: 1px solid var(--color-border-2);
      }
    }
  }
}
</style>
