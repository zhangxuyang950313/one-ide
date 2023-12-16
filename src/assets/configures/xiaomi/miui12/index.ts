import { View, MetaInfo, IdePluginImpl, Module } from "@/schema/schema.ts";
import { settings } from "./settings.ts";

export default class XiaomiMiui12 implements IdePluginImpl {
  getMetaInfo(): MetaInfo {
    return {
      name: "小米主题",
      description: "本插件适用于小米手机MIUI12主题",
    };
  }

  getModules(): Module[] {
    console.log("getModules");
    return settings.modules;
  }

  getViews(module: Module): View[] {
    console.log("getViews", module);
    return module.views;
  }
}
