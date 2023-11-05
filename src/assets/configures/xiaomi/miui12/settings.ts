import view_desktop_0 from "./views-preview/desktop/wallpaper_icons.jpg";
import view_mms_0 from "./views-preview/mms/page_miui_0.jpg";
import view_mms_1 from "./views-preview/mms/page_miui_1.jpg";
import view_contacts_0 from "./views-preview/contacts/page_dial_0.jpg";
import view_contacts_1 from "./views-preview/contacts/page_dial_1.jpg";

import IconThememanager from "./resource/icons/res/drawable-xxhdpi/com.android.thememanager.png";
import IconMms from "./resource/icons/res/drawable-xxhdpi/com.android.mms.png";
import IconTwelveKeyDialer from "./resource/icons/res/drawable-xxhdpi/com.android.contacts.activities.TwelveKeyDialer.png";
import IconContacts from "./resource/icons/res/drawable-xxhdpi/com.android.providers.contacts.png";

import contact_edit_content_bg from "./resource/com.android.contacts/res/drawable-xxhdpi/contact_edit_content_bg.9.png";
import default_wallpaper from "./resource/wallpaper/default_wallpaper.jpg";

import XmlContacts from "./resource/com.android.contacts/theme_values.xml?raw";

import { IdeSettings } from "@/schema/schema.ts";

export const settings: IdeSettings<
  "desktop" | "contacts" | "mms",
  "image" | "xml" | "color" | "bool" | "integer"
> = {
  meta: {
    name: "小米主题",
    description: "本插件适用于小米手机MIUI12主题",
  },
  resourceCategories: [
    { name: "图片", key: "image" },
    { name: "xml", key: "xml" },
    { name: "颜色", key: "color" },
    { name: "布尔", key: "bool" },
    { name: "整型", key: "integer" },
  ],
  modules: [
    {
      key: "desktop",
      name: "桌面和壁纸",
      icon: IconThememanager,
      views: [
        {
          name: "壁纸和图标",
          description: "桌面和壁纸",
          preview: view_desktop_0,
          resources: {
            image: [
              {
                title: "壁纸",
                resources: [
                  {
                    name: "壁纸",
                    description: "",
                    mimeType: "image/jpeg",
                    origin: default_wallpaper,
                    targets: ["wallpaper/default_wallpaper.jpg"],
                  },
                  {
                    name: "锁屏壁纸",
                    description: "",
                    mimeType: "image/jpeg",
                    origin: default_wallpaper,
                    targets: ["wallpaper/default_lock_wallpaper.jpg"],
                  },
                ],
              },
              {
                title: "图标",
                resources: [
                  {
                    name: "拨号",
                    description: "",
                    mimeType: "image/jpeg",
                    origin: IconTwelveKeyDialer,
                    targets: [
                      "icons/res/drawable-xxhdpi/com.android.contacts.png",
                    ],
                  },
                  {
                    name: "联系人",
                    description: "",
                    mimeType: "image/jpeg",
                    origin: IconContacts,
                    targets: [
                      "icons/res/drawable-xxhdpi/com.android.contacts.activities.TwelveKeyDialer.png",
                      "icons/res/drawable-xxhdpi/com.android.providers.contacts.png",
                    ],
                  },
                ],
              },
            ],
            xml: [
              {
                title: "xml文件测试",
                resources: [
                  {
                    name: "桌面字体颜色",
                    description: "",
                    mimeType: "application/xml",
                    origin: XmlContacts,
                    targets: ["com.android.contacts/theme_values.xml"],
                    // origin: `<color name="action_bar_title_text_color_light" package="miui">class_color_top_title</color>`,
                    // targets: [`<color name="$1" package="$2">$3</color>`],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      key: "contacts",
      name: "拨号",
      icon: IconContacts,
      views: [
        {
          name: "拨号与联系人",
          description: "",
          preview: view_contacts_0,
          resources: {
            image: [
              {
                title: "图片",
                resources: [
                  {
                    name: "拨号键盘背景",
                    description: "",
                    mimeType: "image/jpeg",
                    origin: contact_edit_content_bg,
                    targets: ["wallpaper/default_wallpaper.jpg"],
                  },
                ],
              },
            ],
          },
        },
        {
          name: "拨号与联系人1",
          description: "",
          preview: view_contacts_1,
          resources: {
            image: [
              {
                title: "",
                resources: [
                  {
                    name: "拨号键盘背景",
                    description: "",
                    mimeType: "image/jpeg",
                    origin: contact_edit_content_bg,
                    targets: ["wallpaper/default_wallpaper.jpg"],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      key: "mms",
      name: "短信",
      icon: IconMms,
      views: [
        {
          name: "短信列表",
          description: "",
          preview: view_mms_0,
          resources: {},
        },
        {
          name: "短信搜索",
          description: "",
          preview: view_mms_1,
          resources: {},
        },
      ],
    },
  ],
};
