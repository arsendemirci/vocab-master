// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcConfig } from "config";
const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  testIpcHandle: (args) => ipcRenderer.invoke("test-handle", args),
  applicationExit: () => ipcRenderer.invoke(ipcConfig.channel.APP_EXIT),
  getGame: (gameName) =>
    ipcRenderer.invoke(ipcConfig.channel.GET_GAME, gameName),
  getLists: () => ipcRenderer.invoke(ipcConfig.channel.GET_LISTS),
  close: () => ipcRenderer.removeAllListeners(),
});
