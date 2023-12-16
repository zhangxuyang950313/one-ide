import { useStorage } from "@vueuse/core";

export function useStorageData() {
  const editor = useStorage("editor", {
    current: null as string | null,
  });

  const projects = useStorage<Array<{ name: string; path: string }>>(
    "projects",
    [],
  );

  return {
    editor,
    projects,
  };
}
