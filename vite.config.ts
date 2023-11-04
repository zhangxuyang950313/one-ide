import { defineConfig } from "vite";
import path from "path";
import electron from "vite-plugin-electron/simple";
import vue from "@vitejs/plugin-vue";
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
import { vitePluginForArco } from "@arco-plugins/vite-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsxPlugin(),
    vitePluginForArco(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: "electron/main.ts",
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, "electron/preload.ts"),
      },
      // Ployfill the Electron and Node.js built-in modules for Renderer process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],
});
