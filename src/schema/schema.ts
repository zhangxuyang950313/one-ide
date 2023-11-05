import { MimeType } from "file-type";

// 配置元信息
export type MetaInfo = {
  name: string;
  description: string;
};

// 模块配置
export type Module<
  MK extends PropertyKey = PropertyKey,
  RK extends PropertyKey = PropertyKey,
> = {
  key: MK;
  name: string;
  icon: string;
  views: View<RK>[];
};

// 页面配置
export type View<T extends PropertyKey = PropertyKey> = {
  name: string;
  description: string;
  preview: string;
  resources: Partial<Record<T, ResourceGroup[]>>;
};

// 资源分类配置
export type ResourceCategory<T extends PropertyKey = PropertyKey> = {
  key: T;
  name: string;
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

export type IdeSettings<
  MK extends PropertyKey = PropertyKey,
  RK extends PropertyKey = PropertyKey,
> = {
  meta: MetaInfo;
  modules: Module<MK, RK>[];
  resourceCategories: ResourceCategory<RK>[];
};

type MaybePromise<T> = T | Promise<T>;

export interface IdePluginImpl<
  M extends Module = Module,
  V extends View = View,
  R extends ResourceGroup = ResourceGroup,
  C extends ResourceCategory = ResourceCategory,
  I extends MetaInfo = MetaInfo,
> {
  getMetaInfo(): MaybePromise<I>;
  getModules(): MaybePromise<M[]>;
  getViews(m: M): MaybePromise<V[]>;
  getResourceGroups(v: V, c: C): MaybePromise<R[]>;
  getResourceCategories(): MaybePromise<C[]>;
}
