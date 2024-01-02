import { useRequest } from "alova";
import { watch, MaybeRefOrGetter, toValue } from "vue";
import { type DirectoryTree } from "directory-tree";
import { serviceGetDirTree } from "@/service/file";

export function useDirTree(root: MaybeRefOrGetter<string>) {
  const { data, send: fetch } = useRequest(
    () => serviceGetDirTree({ p: toValue(root) }),
    {
      immediate: false,
      initialData: {
        name: "root",
        children: [],
        custom: {},
        path: "",
        size: 0,
        type: "directory",
      } as DirectoryTree,
    },
  );

  watch(
    () => toValue(root),
    (v) => {
      if (!v) return;
      fetch();
    },
    { immediate: true },
  );

  return {
    data,
    fetch,
  };
}
