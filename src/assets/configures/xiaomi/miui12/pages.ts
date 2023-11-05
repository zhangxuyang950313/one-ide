import { TPage } from "../../../../schema/schema.ts";
import { ModuleKey, CategoryKey } from "./enums.ts";
import desktop_wallpaper from "./pages-preview/desktop_wallpaper.jpg";

export const pages: TPage[] = [
  {
    name: "壁纸和图标",
    description: "桌面和壁纸",
    preview: desktop_wallpaper,
    moduleKey: ModuleKey.desktop_wallpaper,
    resources: [
      {
        name: "壁纸",
        description: "",
        categoryKey: CategoryKey.image,
        mimeType: "image/jpeg",
        paths: ["wallpaper/default_wallpaper.jpg"],
      },
      {
        name: "锁屏壁纸",
        description: "",
        categoryKey: CategoryKey.image,
        mimeType: "image/jpeg",
        paths: ["wallpaper/default_lock_wallpaper.jpg"],
      },
    ],
  },
  {
    name: "拨号和联系人",
    description: "拨号面板和联系人界面",
    preview: desktop_wallpaper,
    moduleKey: ModuleKey.contacts,
    resources: [],
  },
  {
    name: "短信",
    description: "短信页面",
    preview: desktop_wallpaper,
    moduleKey: ModuleKey.mms,
    resources: [],
  },
];
