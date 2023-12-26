import { MaybeRefOrGetter } from "vue";
import { useStorageData } from "@/use/useStorageData";
import { alovaOne } from "./index";

const { editor } = useStorageData();
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

type CopyFileParams = {
  from: string;
  to: string;
};
export const serviceCopyFile = (params: CopyFileParams) => {
  console.log({ params });
  return alovaOne.Get("copy-file/", { params });
};

type WriteFileParams = {
  content: string;
  to: string;
};
export const serviceWriteFile = (params: WriteFileParams) => {
  return alovaOne.Post("write-file", params);
};

// serviceWriteFile({ content: "a", to: "2" }).send();
