import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import vue from "@vitejs/plugin-vue";
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
import { vitePluginForArco } from "@arco-plugins/vite-vue";
import vitePluginMonacoEditor from "vite-plugin-monaco-editor";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, "src/views"),

  build: {
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, "views/home/index.html"),
        ide: path.resolve(__dirname, "views/ide/index.html"),
        create: path.resolve(__dirname, "views/create/index.html"),
      },
    },
  },
  plugins: [
    vue(),
    vueJsxPlugin(),
    vitePluginForArco(),
    vitePluginMonacoEditor({}),
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
    preprocessorOptions: {
      less: {
        modifyVars: {
          "arcoblue-6": "#fdcf4c",
        },
      },
    },
  },
});
