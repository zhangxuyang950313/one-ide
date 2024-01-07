import { app, OpenDialogOptions, dialog, ipcMain, shell } from "electron";

ipcMain.on(
  "dialog.showOpenDialog",
  async (event, options: OpenDialogOptions) => {
    const files = await dialog.showOpenDialog(options);
    event.sender.send("dialog.showOpenDialog", files);
  },
);

ipcMain.on(
  "shell.showItemInFolder",
  (event, ...args: Parameters<typeof shell.showItemInFolder>) => {
    shell.showItemInFolder(...args);
  },
);

ipcMain.on("app.getPath", (event, ...args: Parameters<typeof app.getPath>) => {
  event.returnValue = app.getPath(...args);
});

ipcMain.on("app.getAppPath", (event) => {
  event.returnValue = app.getAppPath();
});
