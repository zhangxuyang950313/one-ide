import { TPage } from "../../../../schema/schema.ts";
import { ModuleKey, CategoryKey } from "./enums.ts";
import lockscreen from "./pages-preview/desktop/lockscreen.jpg";
import wallpaper_icons from "./pages-preview/desktop/wallpaper_icons.jpg";

export const pagesDesktop: TPage[] = [
  {
    name: "壁纸和图标",
    description: "桌面和壁纸",
    preview: wallpaper_icons,
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
    name: "壁纸和图标2",
    description: "桌面和壁纸",
    preview: lockscreen,
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
];
