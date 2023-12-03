import { reactive } from "vue";
import { defineStore } from "pinia";

export const useToolbarStore = defineStore("__tool_bar__", () => {
  const panelVisible = reactive({
    module: true,
    view: true,
    preview: true,
  });

  return {
    panelVisible,
  };
});
