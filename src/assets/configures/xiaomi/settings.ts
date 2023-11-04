import thememanager from "./module-icons/com.android.thememanager.png";
import mms from "./module-icons/com.android.mms.png";
import contacts from "./module-icons/com.android.contacts.activities.TwelveKeyDialer.png";

import { TIDESettings } from "../../../schema/schema.ts";
import { pages } from "./pages.ts";
import { ModuleEnum, ResourceCateGoryKey } from "./enums.ts";

const ideSettings: TIDESettings = {
  meta: {
    name: "小米主题",
    description: "适用于小米主题的编辑器",
  },
  modules: [
    {
      key: ModuleEnum.desktop_wallpaper,
      name: "桌面和壁纸",
      icon: thememanager,
    },
    {
      key: ModuleEnum.contacts,
      name: "拨号",
      icon: contacts,
    },
    {
      key: ModuleEnum.mms,
      name: "短信",
      icon: mms,
    },
  ],
  pages,
  resourceCategories: [
    {
      name: "图片",
      key: ResourceCateGoryKey.image,
    },
    {
      name: "颜色值",
      key: ResourceCateGoryKey.color,
    },
    {
      name: "布尔值",
      key: ResourceCateGoryKey.bool,
    },
    {
      name: "整型值",
      key: ResourceCateGoryKey.integer,
    },
  ],
  packSteps: [],
};

export default ideSettings;
