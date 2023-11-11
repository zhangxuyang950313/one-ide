import { shallowRef, watchEffect, watch } from "vue";
import type {
  Module,
  View,
  MetaInfo,
  IdePluginImpl,
} from "../schema/schema.ts";
// // TODO 设置编辑器配置
// const allSettings = Object.values<TIDESettings>(
//   import.meta.glob("@/assets/configures/**/*/settings.ts", {
//     eager: true,
//     import: "default",
//   }),
// );
// console.log(allSettings);

// 记忆选中的页面
const viewPosMap = new Map<Module, View>();

export const useIdeState = (idePlugin: IdePluginImpl) => {
  // 插件信息
  const metaInfo = shallowRef<MetaInfo | null>(null);
  (async function () {
    metaInfo.value = await idePlugin.getMetaInfo();
  })();

  // 模块列表
  const modules = shallowRef<Module[]>([]);
  // 获取模块列表
  (async function () {
    modules.value = await idePlugin.getModules();
  })();
  // 当前选中的模块
  const selectModule = shallowRef<Module | null>(null);
  watchEffect(() => {
    if (modules.value.length > 0 && !selectModule.value) {
      selectModule.value = modules.value[0];
    }
  });

  // 页面列表
  const views = shallowRef<View[]>([]);
  watchEffect(async () => {
    if (!selectModule.value) views.value = [];
    else views.value = await idePlugin.getViews(selectModule.value);
  });
  // 当前选中的页面
  const selectView = shallowRef<View | null>(null);
  watch(selectView, (selectView) => {
    if (!selectModule.value || !selectView) return;
    viewPosMap.set(selectModule.value, selectView);
  });
  // 选中页面策略
  watch([selectModule, views], ([selectModule]) => {
    if (!selectModule) return;
    const memoryView = viewPosMap.get(selectModule);
    if (memoryView) {
      selectView.value = memoryView;
    } else if (views.value.find((v) => v !== selectView.value)) {
      selectView.value = views.value[0];
    } else {
      selectView.value = null;
    }
  });

  // // 资源分类
  // const resourceCategories = shallowRef<ResourceCategory[]>([]);
  // // 获取资源分类配置
  // (async function () {
  //   resourceCategories.value = await idePlugin.getResourceCategories();
  // })();
  // // 当前选中的资源分类
  // const selectCategory = shallowRef<ResourceCategory | null>(null);
  // watchEffect(() => {
  //   if (!selectCategory.value && resourceCategories.value.length > 0) {
  //     selectCategory.value = resourceCategories.value[0];
  //   }
  // });
  //
  // // 资源列表
  // const resourceGroups = shallowRef<ResourceGroup[]>([]);
  // watchEffect(async () => {
  //   if (!selectView.value || !selectCategory.value) {
  //     resourceGroups.value = [];
  //   } else {
  //     resourceGroups.value = await idePlugin.getResourceGroups(
  //       selectView.value,
  //     );
  //   }
  // });

  return {
    metaInfo,
    modules,
    selectModule,
    views,
    selectView,
  };
};
