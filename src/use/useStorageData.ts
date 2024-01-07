import { useStorage } from "@vueuse/core";

const enum storageKey {
  editor = "editor",
  projects = "projects",
}

export function useStorageData() {
  const editor = useStorage<{
    current: string;
    template: string;
  }>(storageKey.editor, {
    current: "",
    template: `${window.electron.app.getAppPath()}/src/assets/configures/xiaomi/miui12/resource`,
  });

  const projects = useStorage<Array<{ name: string; path: string }>>(
    storageKey.projects,
    [],
  );

  return {
    editor,
    projects,
  };
}
