import { MaybeRefOrGetter } from "vue";
import { useStorageData } from "@/use/useStorageData";
import { alovaFile } from "./index";

const { editor } = useStorageData();
type GetFileParams = {
  p: string;
};
export const serviceGetFile = (params: GetFileParams) => {
  return alovaFile.Get("file/", { params });
};

// 获取当前项目文件
export const serviceGetProjectFile = (target: MaybeRefOrGetter<string>) => {
  return alovaFile.Get("file/", {
    params: { p: `${editor.value.current}/${target}` },
  });
};

type CopyFileParams = {
  from: string;
  to: string;
};
export const serviceCopyFile = (params: CopyFileParams) => {
  console.log({ params });
  return alovaFile.Get("copy-file/", { params });
};
