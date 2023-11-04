export type ModuleSchema = {
    name: string;
    icon: string;
    pages: PageSchema[];
}
export type PageSchema = {
    name: string;
    config: {};
}
export type MetaInfo = {
    name: string;
}
export type ConfigureSchema = {
    meta: MetaInfo;
    modules: Array<ModuleSchema>;
}