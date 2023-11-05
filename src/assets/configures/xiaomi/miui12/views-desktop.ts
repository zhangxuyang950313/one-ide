import { TElement, TView } from "../../../../schema/schema.ts";
import { ModuleKey, CategoryKey } from "./enums.ts";

import wallpaper_icons from "./pages-preview/desktop/wallpaper_icons.jpg";
import default_wallpaper from "./resource/wallpaper/default_wallpaper.jpg";
import default_lock_wallpaper from "./resource/wallpaper/default_lock_wallpaper.jpg";
import TwelveKeyDialer from "./resource/icons/res/drawable-xxhdpi/com.android.contacts.activities.TwelveKeyDialer.png";
import contacts from "./resource/icons/res/drawable-xxhdpi/com.android.providers.contacts.png";

const images: TElement[] = [
  {
    type: "divide",
    categoryKey: CategoryKey.image,
    title: "壁纸",
    description: "",
  },
  {
    type: "resource",
    categoryKey: CategoryKey.image,
    name: "壁纸",
    description: "",
    mimeType: "image/jpeg",
    origin: default_wallpaper,
    targets: ["wallpaper/default_wallpaper.jpg"],
  },
  {
    type: "resource",
    name: "锁屏壁纸",
    description: "",
    categoryKey: CategoryKey.image,
    mimeType: "image/jpeg",
    origin: default_wallpaper,
    targets: ["wallpaper/default_lock_wallpaper.jpg"],
  },
  {
    type: "divide",
    categoryKey: CategoryKey.image,
    title: "图标",
    description: "",
  },
  {
    type: "resource",
    name: "拨号",
    description: "",
    categoryKey: CategoryKey.image,
    mimeType: "image/jpeg",
    origin: TwelveKeyDialer,
    targets: ["icons/res/drawable-xxhdpi/com.android.contacts.png"],
  },
  {
    type: "resource",
    name: "联系人",
    description: "",
    categoryKey: CategoryKey.image,
    mimeType: "image/jpeg",
    origin: contacts,
    targets: [
      "icons/res/drawable-xxhdpi/com.android.contacts.activities.TwelveKeyDialer.png",
      "icons/res/drawable-xxhdpi/com.android.providers.contacts.png",
    ],
  },
];

export const viewsDesktop: TView[] = [
  {
    name: "壁纸和图标",
    description: "桌面和壁纸",
    preview: wallpaper_icons,
    moduleKey: ModuleKey.desktop_wallpaper,
    resources: [
      ...images,
      {
        type: "resource",
        name: "颜色值测试",
        description: "",
        categoryKey: CategoryKey.color,
        mimeType: "application/xml",
        origin: default_lock_wallpaper,
        targets: [],
      },
    ],
  },
];
