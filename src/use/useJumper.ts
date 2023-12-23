import { useRouter } from "vue-router";
import { useStorageData } from "./useStorageData";
import { ViewPath } from "../../common/enums";

export function useJumper() {
  const router = useRouter();
  const { editor } = useStorageData();

  // 打开编辑器窗口
  function openEditor(path: string) {
    editor.value.current = path;
    router.push({
      name: "ide",
    });
    // window.electron.openWindow(ViewPath.IDE);
  }

  // 创建项目窗口
  function openCreator() {
    window.electron.openWindow(ViewPath.CREATE);
  }

  return {
    openEditor,
    openCreator,
  };
}
