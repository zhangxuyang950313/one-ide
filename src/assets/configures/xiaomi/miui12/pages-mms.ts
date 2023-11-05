import { TPage } from "../../../../schema/schema.ts";
import { ModuleKey, CategoryKey } from "./enums.ts";
import page_miui_0 from "./pages-preview/mms/page_miui_0.jpg";
import page_miui_1 from "./pages-preview/mms/page_miui_1.jpg";

export const pagesMms: TPage[] = [
  {
    name: "短信列表",
    description: "",
    preview: page_miui_0,
    moduleKey: ModuleKey.mms,
    resources: [
      {
        name: "短信列表",
        description: "",
        categoryKey: CategoryKey.image,
        mimeType: "image/jpeg",
        paths: ["wallpaper/default_wallpaper.jpg"],
      },
    ],
  },
  {
    name: "短信搜索",
    description: "",
    preview: page_miui_1,
    moduleKey: ModuleKey.mms,
    resources: [
      {
        name: "短信列表",
        description: "",
        categoryKey: CategoryKey.image,
        mimeType: "image/jpeg",
        paths: ["wallpaper/default_wallpaper.jpg"],
      },
    ],
  },
];
