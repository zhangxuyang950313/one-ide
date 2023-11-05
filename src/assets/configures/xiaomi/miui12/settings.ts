import { viewsDesktop } from "./views-desktop.ts";
import { viewsContacts } from "./views-contacts.ts";
import { viewsMms } from "./views-mms.ts";
import { ModuleKey, CategoryKey } from "./enums.ts";
import { TIDESettings } from "../../../../schema/schema.ts";

import mms from "./resource/icons/res/drawable-xxhdpi/com.android.mms.png";
import thememanager from "./resource/icons/res/drawable-xxhdpi/com.android.thememanager.png";
import contacts from "./resource/icons/res/drawable-xxhdpi/com.android.contacts.activities.TwelveKeyDialer.png";

const ideSettings: TIDESettings = {
  meta: {
    name: "小米主题",
    description: "适用于小米主题的编辑器",
    uiVersion: "miui12",
  },
  modules: [
    {
      key: ModuleKey.desktop_wallpaper,
      name: "桌面和壁纸",
      icon: thememanager,
    },
    {
      key: ModuleKey.contacts,
      name: "拨号",
      icon: contacts,
    },
    {
      key: ModuleKey.mms,
      name: "短信",
      icon: mms,
    },
  ],
  views: [...viewsDesktop, ...viewsContacts, ...viewsMms],
  resourceCategories: [
    {
      name: "图片",
      key: CategoryKey.image,
    },
    {
      name: "颜色值",
      key: CategoryKey.color,
    },
    {
      name: "布尔值",
      key: CategoryKey.bool,
    },
    {
      name: "整型值",
      key: CategoryKey.integer,
    },
  ],
  packSteps: [],
};

export default ideSettings;
