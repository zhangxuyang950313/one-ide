import { createApp } from "vue";
import "./style.css";
import "@arco-design/web-vue/es/style/index.less";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app").$nextTick(() => {
  // Remove Preload scripts loading
  postMessage({ payload: "removeLoading" }, "*");

  // Use contextBridge
  window.ipcRenderer.on("main-process-message", (_event, message) => {
    console.log(message);
  });
});
