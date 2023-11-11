import { MimeType } from "file-type";

// 配置元信息
export type MetaInfo = {
  name: string;
  description: string;
};

// 模块配置
export type Module<MK extends PropertyKey = PropertyKey> = {
  key: MK;
  name: string;
  icon: string;
  views: View[];
};

// 页面配置
export type View = {
  name: string;
  description: string;
  preview: string;
  resources: Array<
    | {
        name: string;
        use: "file-list";
        resources: ResourceGroup[];
      }
    | {
        name: string;
        use: "file";
        resource: Resource;
      }
  >;
};

// 资源
export type Resource = {
  mimeType: MimeType; // 文件类型
  origin: string; // 资源位置
  targets: string[]; // 目标位置
  name: string;
  description: string;
};

export type ResourceGroup = {
  title: string;
  resources: Resource[];
};

// 打包步骤
export type PackStep = {
  name: string;
  script: string;
};

export type IdeSettings<MK extends PropertyKey = PropertyKey> = {
  meta: MetaInfo;
  modules: Module<MK>[];
};

type MaybePromise<T> = T | Promise<T>;

export interface IdePluginImpl<
  M extends Module = Module,
  V extends View = View,
  I extends MetaInfo = MetaInfo,
> {
  getMetaInfo(): MaybePromise<I>;
  getModules(): MaybePromise<M[]>;
  getViews(m: M): MaybePromise<V[]>;
}
