import { TPage } from "../../../../schema/schema.ts";
import { ModuleKey, CategoryKey } from "./enums.ts";
import page_dial_0 from "./pages-preview/contacts/page_dial_0.jpg";

export const pagesContacts: TPage[] = [
  {
    name: "拨号和联系人",
    description: "拨号面板和联系人界面",
    preview: page_dial_0,
    moduleKey: ModuleKey.contacts,
    resources: [
      {
        name: "拨号键盘",
        description: "",
        categoryKey: CategoryKey.image,
        mimeType: "image/jpeg",
        paths: ["wallpaper/default_wallpaper.jpg"],
      },
    ],
  },
];
