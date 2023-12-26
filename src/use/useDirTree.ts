import { useRequest } from "alova";
import { watchEffect } from "vue";
import { type DirectoryTree } from "directory-tree";
import { serviceGetDirTree } from "@/service/file";
import { useStorageData } from "@/use/useStorageData";

export function useDirTree() {
  const storageData = useStorageData();

  const { data, send: fetch } = useRequest(
    () => serviceGetDirTree({ p: storageData.editor.value.current || "" }),
    {
      immediate: true,
      initialData: {
        name: "",
        children: [],
        custom: {},
        path: "",
        size: 0,
        type: "directory",
      } as DirectoryTree,
    },
  );

  watchEffect(() => {
    if (!storageData.editor.value.current) return;
    fetch();
  });

  return {
    data,
    fetch,
  };
}
