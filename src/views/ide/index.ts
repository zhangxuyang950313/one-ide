import { createApp } from "vue";
import "@/style.css";
import "tailwindcss/tailwind.css";
import { createPinia } from "pinia";
import App from "./index.vue";
import router from "./router";

createApp(App)
  .use(router)
  .use(createPinia())
  .mount("#app")
  .$nextTick(() => {
    // Remove Preload scripts loading
    postMessage({ payload: "removeLoading" }, "*");

    // Use contextBridge
    window.electron.ipcRenderer.on(
      "main-process-message",
      (_event, message) => {
        console.log(message);
      },
    );
  });
