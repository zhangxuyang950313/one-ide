import { Dialog, Shell, contextBridge, ipcRenderer } from "electron";

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj);

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

    if (typeof value === "function") {
      // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args);
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: withPrototype(ipcRenderer),
  shell: {
    showItemInFolder: (fullPath) => {
      ipcRenderer.send("shell.showItemInFolder", fullPath);
    },
  } as Shell,
  dialog: {
    showOpenDialog: (...args: any[]) => {
      ipcRenderer.send("dialog.showOpenDialog", ...args);
      return new Promise((resolve) => {
        ipcRenderer.on("dialog.showOpenDialog", (_event, result) => {
          resolve(result);
        });
      });
    },
  } as Dialog,
  openWindow: (...args: any[]) => {
    ipcRenderer.send("openWindow", ...args);
  },
});
