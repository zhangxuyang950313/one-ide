import { computed, shallowRef } from "vue";
import { type TIDESettings, TModule } from "../schema/schema.ts";

// TODO 设置编辑器配置
const allSettings = Object.values<TIDESettings>(
  import.meta.glob("../assets/configures/**/*/settings.ts", {
    eager: true,
    import: "default",
  }),
);
console.log(allSettings);

export const useIdeState = () => {
  const settings = computed(() => allSettings[0]);
  // 模块列表
  const modules = computed(() => settings.value.modules);
  // 资源分类
  const resourceCategories = computed(() => settings.value.resourceCategories);
  // 当前选中的模块
  const moduleSelected = shallowRef<TModule>(settings.value.modules[0]);
  // 当前选中模块下页面
  const pagesBySelectedModule = computed(() =>
    settings.value.views.filter(
      (page) => moduleSelected.value.key === page.moduleKey,
    ),
  );
  // 当前选中的页面
  const pageSelected = shallowRef(pagesBySelectedModule.value[0]);

  return {
    settings,
    modules,
    resourceCategories,
    moduleSelected,
    pagesBySelectedModule,
    pageSelected,
  };
};
