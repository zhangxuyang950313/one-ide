import { MimeType } from "file-type";

// 配置元信息
export type TMetaInfo = {
  name: string;
  description: string;
  uiVersion: string;
  [k: string]: string;
};

// 模块配置
export type TModule = {
  key: string | number; // 模块标识
  name: string;
  icon: string;
};

// 页面配置
export type TView = {
  name: string;
  description: string;
  preview: string;
  moduleKey: string | number | TModule; // 归属于模块
  resources: TElement[]; // 页面资源
};

// 资源分类配置
export type TResourceCategory = {
  key: string | number; // 资源分类标识
  name: string;
};

// 资源
export type TDivide = {
  type: "divide";
  categoryKey: string | number | TResourceCategory; // 归属于资源分类
  title: string;
  description: string;
};
export type TResource = {
  type: "resource";
  categoryKey: string | number | TResourceCategory; // 归属于资源分类
  mimeType: MimeType; // 文件类型
  origin: string; // 资源位置
  targets: string[]; // 目标位置
  name: string;
  description: string;
};
export type TElement = TDivide | TResource;

// 打包步骤
export type TPackStep = {
  name: string;
  script: string;
};

// IDE 配置汇总
export type TIDESettings = {
  meta: TMetaInfo;
  modules: TModule[];
  views: TView[];
  resourceCategories: TResourceCategory[];
  packSteps: TPackStep[];
};
