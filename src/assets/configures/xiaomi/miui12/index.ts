import {
  View,
  MetaInfo,
  IdePluginImpl,
  ResourceGroup,
  ResourceCategory,
  Module,
} from "@/schema/schema.ts";
import { settings } from "./settings.ts";

export default class XiaomiMiui12 implements IdePluginImpl {
  getMetaInfo(): MetaInfo {
    return {
      name: "小米主题",
      description: "本插件适用于小米手机MIUI12主题",
    };
  }
  getResourceCategories(): ResourceCategory[] {
    console.log("getResourceCategories");
    return settings.resourceCategories;
  }

  getModules(): Module[] {
    console.log("getModules");
    return settings.modules;
  }

  getViews(module: Module): View[] {
    console.log("getViews", module);
    return module.views;
  }

  getResourceGroups(v: View, c: ResourceCategory): ResourceGroup[] {
    console.log({ v, c });
    return v.resources[c.key] || [];
  }
}
