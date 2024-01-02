import { IdeSettings } from "@/schema/schema.ts";
import view_desktop_0 from "./views-preview/desktop/wallpaper_icons.jpg";
import view_mms_0 from "./views-preview/mms/page_miui_0.jpg";
import view_mms_1 from "./views-preview/mms/page_miui_1.jpg";
import view_contacts_0 from "./views-preview/contacts/page_dial_0.jpg";
import view_contacts_1 from "./views-preview/contacts/page_dial_1.jpg";
import IconThemeManager from "./resource/icons/res/drawable-xxhdpi/com.android.thememanager.png";
import IconMms from "./resource/icons/res/drawable-xxhdpi/com.android.mms.png";
import IconTwelveKeyDialer from "./resource/icons/res/drawable-xxhdpi/com.android.contacts.activities.TwelveKeyDialer.png";
import IconContacts from "./resource/icons/res/drawable-xxhdpi/com.android.providers.contacts.png";
import contact_edit_content_bg from "./resource/com.android.contacts/res/drawable-xxhdpi/contact_edit_content_bg.9.png";
import default_wallpaper from "./resource/wallpaper/default_wallpaper.jpg";
import XMLContactsThemeValues from "./resource/com.android.contacts/theme_values.xml?raw";
import XMLContactsThemeFallback from "./resource/com.android.contacts/theme_fallback.xml?raw";
import XmlLocationManifest from "./resource/lockscreen/advance/manifest.xml?raw";

export const settings: IdeSettings<
  "lockscreen" | "desktop" | "contacts" | "mms"
> = {
  meta: {
    name: "小米主题",
    description: "本插件适用于小米手机MIUI12主题",
  },
  modules: [
    {
      key: "desktop",
      name: "桌面和壁纸",
      icon: IconThemeManager,
      dir: ["com.miui.home"],
      views: [
        {
          name: "壁纸和图标",
          description: "桌面和壁纸",
          preview: view_desktop_0,
          resources: [
            {
              name: "壁纸",
              use: "file-list",
              resources: [
                {
                  title: "",
                  resources: [
                    {
                      name: "壁纸",
                      description: "",
                      mimeType: "image/jpeg",
                      origin: default_wallpaper,
                      release: ["wallpaper/default_wallpaper.jpg"],
                    },
                    {
                      name: "锁屏壁纸",
                      description: "",
                      mimeType: "image/jpeg",
                      origin: default_wallpaper,
                      release: ["wallpaper/default_lock_wallpaper.jpg"],
                    },
                  ],
                },
              ],
            },
            {
              name: "图标",
              use: "file-list",
              resources: [
                {
                  title: "",
                  resources: [
                    {
                      name: "拨号",
                      description: "",
                      mimeType: "image/jpeg",
                      origin: IconTwelveKeyDialer,
                      release: [
                        "icons/res/drawable-xxhdpi/com.android.contacts.png",
                      ],
                    },
                    {
                      name: "联系人",
                      description: "",
                      mimeType: "image/jpeg",
                      origin: IconContacts,
                      release: [
                        "icons/res/drawable-xxhdpi/com.android.contacts.activities.TwelveKeyDialer.png",
                        "icons/res/drawable-xxhdpi/com.android.providers.contacts.png",
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "theme_values.xml",
              use: "file",
              resource: {
                name: "theme_values.xml",
                description: "",
                mimeType: "application/xml",
                origin: XMLContactsThemeValues,
                release: ["com.android.contacts/theme_values.xml"],
                // origin: `<color name="action_bar_title_text_color_light" package="miui">class_color_top_title</color>`,
                // targets: [`<color name="$1" package="$2">$3</color>`],
              },
            },
            {
              name: "theme_fallback.xml",
              use: "file",
              resource: {
                name: "theme_fallback.xml",
                description: "",
                mimeType: "application/xml",
                origin: XMLContactsThemeFallback,
                release: ["com.android.contacts/theme_values.xml"],
                // origin: `<color name="action_bar_title_text_color_light" package="miui">class_color_top_title</color>`,
                // targets: [`<color name="$1" package="$2">$3</color>`],
              },
            },
          ],
        },
      ],
    },
    {
      key: "lockscreen",
      name: "百变引擎",
      icon: IconThemeManager,
      dir: ["lockscreen"],
      views: [
        {
          name: "百变锁屏",
          description: "MAML百变锁屏",
          preview: default_wallpaper,
          resources: [
            {
              name: "锁屏脚本",
              use: "file",
              resource: {
                name: "",
                description: "",
                mimeType: "application/xml",
                origin: XmlLocationManifest,
                release: ["lockscreen/advance/manifest.xml"],
              },
            },
            {
              name: "theme_values.xml",
              use: "file",
              resource: {
                name: "",
                description: "",
                mimeType: "application/xml",
                origin: "",
                release: ["lockscreen/theme_values.xml"],
              },
            },
            {
              name: "config.xml",
              use: "file",
              resource: {
                name: "",
                description: "",
                mimeType: "application/xml",
                origin: "",
                release: ["lockscreen/advance/config.xml"],
              },
            },
          ],
        },
      ],
    },
    {
      key: "contacts",
      name: "拨号",
      icon: IconContacts,
      dir: ["com.android.contacts"],
      views: [
        {
          name: "拨号与联系人",
          description: "",
          preview: view_contacts_0,
          resources: [
            {
              name: "图片",
              use: "file-list",
              resources: [
                {
                  title: "",
                  resources: [
                    {
                      name: "拨号键盘背景",
                      description: "",
                      mimeType: "image/jpeg",
                      origin: contact_edit_content_bg,
                      release: ["wallpaper/default_wallpaper.jpg"],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "拨号与联系人1",
          description: "",
          preview: view_contacts_1,
          resources: [
            {
              name: "图片",
              use: "file-list",
              resources: [
                {
                  title: "",
                  resources: [
                    {
                      name: "拨号键盘背景",
                      description: "",
                      mimeType: "image/jpeg",
                      origin: contact_edit_content_bg,
                      release: ["wallpaper/default_wallpaper.jpg"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "mms",
      name: "短信",
      icon: IconMms,
      dir: ["com.android.mms"],
      views: [
        {
          name: "短信列表",
          description: "",
          preview: view_mms_0,
          resources: [],
        },
        {
          name: "短信搜索",
          description: "",
          preview: view_mms_1,
          resources: [],
        },
      ],
    },
  ],
};
