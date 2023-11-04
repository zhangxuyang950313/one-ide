<script setup lang="ts">
import { computed, shallowRef } from "vue";
import { Empty, Tabs } from "@arco-design/web-vue";
import ModuleSelector from "../components/ModuleSelector.vue";
import ToolBar from "../components/ToolBar.vue";
import PageSelector from "../components/PageSelector.vue";
import PagePreview from "../components/PagePreview.vue";
import ResourceHandler from "../components/ResourceHandler.vue";

import { type TIDESettings, TModule } from "../schema/schema.ts";

// TODO 设置编辑器配置
const allSettings = Object.values<TIDESettings>(
  import.meta.glob("../assets/configures/*/settings.ts", {
    eager: true,
    import: "default",
  }),
);
console.log(allSettings);
const currentSettings = computed(() => allSettings[0]);
const resourceCategories = computed(
  () => currentSettings.value.resourceCategories,
);
const modules = shallowRef<TModule>(currentSettings.value.modules[0]);
const pages = computed(() =>
  currentSettings.value.pages.filter(
    (item) => modules.value.key === item.moduleKey,
  ),
);
const currentPage = computed(() => pages.value[0]);
const currentResources = computed(() => currentPage.value?.resources || []);
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
      <section class="module-selector">
        <ModuleSelector :modules="currentSettings.modules" />
      </section>
      <!-- 模块内容编辑 -->
      <section class="module-content">
        <template v-if="!!modules">
          <!-- 页面选择器 -->
          <section class="page-selector">
            <PageSelector :pages="pages" />
          </section>
          <!-- 页面预览 -->
          <section class="page-preview">
            <PagePreview :preview="currentPage.preview" />
          </section>
          <!-- 页面内容编辑 -->
          <section class="page-resource">
            <Tabs class="tabs">
              <Tabs.TabPane
                v-for="item in resourceCategories"
                :key="item.key"
                :title="item.name"
              >
                <ResourceHandler :resource="currentResources" />
              </Tabs.TabPane>
            </Tabs>
          </section>
        </template>
        <template v-else>
          <Empty class="empty" description="未选择模块" />
        </template>
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
    height: 60px;
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
      .empty {
        position: absolute;
        width: auto;
        padding: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .page-selector {
        width: 220px;
        height: 100%;
        padding: 15px;
        flex-shrink: 0;
        border-right: 1px solid var(--color-border-2);
        overflow: auto;
      }
      .page-preview {
        width: 300px;
        height: 100%;
        padding: 15px;
        flex-shrink: 0;
        border-right: 1px solid var(--color-border-2);
      }
      .page-resource {
        width: 100%;
        .tabs {
        }
      }
    }
  }
}
</style>
