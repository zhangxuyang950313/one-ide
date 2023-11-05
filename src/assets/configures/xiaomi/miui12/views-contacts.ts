import { TView } from "../../../../schema/schema.ts";
import { ModuleKey, CategoryKey } from "./enums.ts";
import page_dial_0 from "./pages-preview/contacts/page_dial_0.jpg";

export const viewsContacts: TView[] = [
  {
    name: "拨号和联系人",
    description: "拨号面板和联系人界面",
    preview: page_dial_0,
    moduleKey: ModuleKey.contacts,
    elements: [
      {
        type: "resource",
        name: "拨号键盘背景",
        description: "",
        categoryKey: CategoryKey.image,
        mimeType: "image/jpeg",
        origin: "",
        targets: ["wallpaper/default_wallpaper.jpg"],
      },
    ],
  },
];
