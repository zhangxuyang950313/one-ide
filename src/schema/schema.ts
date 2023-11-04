import { MimeType } from "file-type";

// 配置元信息
export type TMetaInfo = {
  name: string;
  description: string;
};

// 模块配置
export type TModule = {
  key: string | number; // 模块标识
  name: string;
  icon: string;
};

// 页面配置
export type TPage = {
  name: string;
  description: string;
  preview: string;
  moduleKey: string | number; // 归属于模块
  resources: TResource[]; // 页面资源
};

// 资源分类配置
export type TResourceCategory = {
  key: string | number; // 资源分类标识
  name: string;
};

// 资源
export type TResource = {
  resourceCategoryKey: string | number; // 归属于资源分类
  mimeType: MimeType; // 文件类型
  file: string;
  description: string;
};

// 打包步骤
export type TPackStep = {
  name: string;
  script: string;
};

// IDE 配置汇总
export type TIDESettings = {
  meta: TMetaInfo;
  modules: TModule[];
  pages: TPage[];
  resourceCategories: TResourceCategory[];
  packSteps: TPackStep[];
};
