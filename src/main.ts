import "@/style.css";
import "tailwindcss/tailwind.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { lazy } from "./utils/directives";

createApp(App)
  .use(router)
  .use(createPinia())
  .use(lazy)
  .mount("#app")
  .$nextTick(() => {
    // Remove Preload scripts loading
    postMessage({ payload: "removeLoading" }, "*");

    // Use contextBridge
    window.electron.ipcRenderer.on(
      "main-process-message",
      (_event, message) => {
        console.log({ _event, message });
      },
    );
  });
