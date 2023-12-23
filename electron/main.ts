import {
  app,
  session,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
} from "electron";
import path from "node:path";
import { registerCustomProtocol } from "./customProtocol";
import { ViewPath } from "../common/enums";
import "./ipcMainOn";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

// 用于添加Chromium插件
async function setupDevTools() {
  // // 安装 vue 开发者工具
  // const {
  //     default: installExtension,
  //     VUEJS3_DEVTOOLS
  // } = await import("electron-extensions-installer");
  // return installExtension([
  //     VUEJS3_DEVTOOLS
  // ]);
  return await session.defaultSession.loadExtension(
    path.resolve("electron/extensions/vue3_devtools_6.5.1_0"),
  );
}

const windowsSet = new Set<BrowserWindow>();
const partition = "persist:one";
async function createWindow(
  view = ViewPath.HOME,
  options?: BrowserWindowConstructorOptions,
) {
  const mergedOptions: BrowserWindowConstructorOptions = {
    icon: path.join(process.env.VITE_PUBLIC, "favicon.ico"),
    // width: 800,
    // height: 600,
    // minWidth: 800,
    // minHeight: 600,
    width: 1200,
    height: 800,
    center: true,
    zoomToPageWidth: true,
    titleBarOverlay: true,
    // show: false,
    backgroundColor: "#242424",
    titleBarStyle: "hiddenInset",
    webPreferences: {
      // sandbox: false,
      spellcheck: false,
      scrollBounce: true,
      preload: path.join(__dirname, "preload.js"),
      partition,
    },
    ...(options || {}),
  };
  if (VITE_DEV_SERVER_URL && mergedOptions.width) {
    mergedOptions.width += 500;
  }
  const win = new BrowserWindow(mergedOptions);

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(`${VITE_DEV_SERVER_URL}${view}`);
    if ([ViewPath.HOME, ViewPath.IDE].includes(view)) {
      win.webContents.openDevTools();
    }
  } else {
    win.loadFile("dist/index.html");
    // win.loadFile(path.join(process.env.DIST, `views/${view}/index.html#/`));
  }
  windowsSet.add(win);
  win.on("closed", () => {
    windowsSet.delete(win);
    // 窗口全部关闭打开首页
    if (windowsSet.size === 0 && view !== ViewPath.HOME) {
      createWindow(ViewPath.HOME);
    }
  });
  return win;
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", async () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // if (BrowserWindow.getAllWindows().length === 0) {
  //   await createWindow(ViewPath.HOME);
  // }
});

app.whenReady().then(async () => {
  const ses = session.fromPartition(partition, { cache: true });
  registerCustomProtocol(ses);
  // await createWindow(ViewPath.IDE, {
  //   width: 1200,
  //   height: 800,
  //   webPreferences: {
  //     spellcheck: false,
  //     scrollBounce: true,
  //     preload: path.join(__dirname, "preload.js"),
  //     partition,
  //   },
  // });
  await createWindow(ViewPath.HOME);
  if (VITE_DEV_SERVER_URL) {
    await setupDevTools();
  }
});

ipcMain.on("openWindow", (_event, name: ViewPath) => {
  switch (name) {
    case ViewPath.IDE: {
      createWindow(name, {
        width: 1200,
        height: 800,
      });
      break;
    }
    case ViewPath.CREATE: {
      // 创建子窗口
      // const parent = BrowserWindow.fromId(_event.frameId);
      createWindow(name, {
        width: 400,
        height: 500,
        resizable: false,
        alwaysOnTop: true,
        // parent: parent || void 0,
        modal: true,
      });
    }
  }
});
