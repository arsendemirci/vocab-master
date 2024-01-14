const { channels } = require("../shared/constants.js");

const { ipcMain, app } = require("electron");

module.exports = {
  initIPC: function () {
    //get array of rpk names in the rpk directory
    ipcMain.on(channels.GET_RPKS, (event, arg) => {
      const fs = require("fs");
      const rpkList = fs.readdirSync("C:\\Projects/Web UI Devkit/rpks");
      event.sender.send(channels.GET_RPKS, rpkList);
    });

    ipcMain.on("GET_GAME", (event, arg) => {
      const fs = require("fs");
      const { shuffle } = require("../../src/utils/array.js");

      const path = require("path");
      const dirPath = path.resolve(
        __dirname,
        "../../src/backend/data/games/verbs.json"
      );
      console.log("dirpath", dirPath);
      let rawdata = fs.readFileSync(dirPath);
      let verbs = JSON.parse(rawdata);
      let gameData = shuffle(verbs).slice(0, 5);
      event.sender.send("GET_GAME", gameData);
    });

    // quit the application
    ipcMain.on(channels.APP_EXIT, () => {
      app.quit();
    });
    //other ipc requests from other channels will be added here
  },
};
