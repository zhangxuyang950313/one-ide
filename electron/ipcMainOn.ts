import { OpenDialogOptions, dialog, ipcMain, shell } from "electron";

ipcMain.on(
  "dialog.showOpenDialog",
  async (event, options: OpenDialogOptions) => {
    const files = await dialog.showOpenDialog(options);
    event.sender.send("dialog.showOpenDialog", files);
  },
);

ipcMain.on("shell.showItemInFolder", (event, fullPath: string) => {
  shell.showItemInFolder(fullPath);
});
