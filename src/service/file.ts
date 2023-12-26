import { MaybeRefOrGetter } from "vue";
import { type DirectoryTree } from "directory-tree";
import { useStorageData } from "@/use/useStorageData";
import { alovaOne } from "./index";

const { editor } = useStorageData();

// 获取文件
type GetFileParams = {
  p: string;
};
export const serviceGetFile = (params: GetFileParams) => {
  return alovaOne.Get("file/", { params });
};

// 获取当前项目文件
export const serviceGetProjectFile = (target: MaybeRefOrGetter<string>) => {
  return alovaOne.Get("file/", {
    params: { p: `${editor.value.current}/${target}` },
  });
};

// 本地拷贝文件
type CopyFileParams = {
  from: string;
  to: string;
};
export const serviceCopyFile = (params: CopyFileParams) => {
  return alovaOne.Get("copy-file", { params });
};

// 写入文件
type WriteFileParams = {
  content: string;
  to: string;
};
export const serviceWriteFile = (params: WriteFileParams) => {
  return alovaOne.Post("write-file", params);
};

type GetDirTreeParams = {
  p: string;
};
export const serviceGetDirTree = (params: GetDirTreeParams) => {
  return alovaOne.Get("dir-tree", {
    params,
    transformData(data: string) {
      return JSON.parse(data) as DirectoryTree;
    },
  });
};
