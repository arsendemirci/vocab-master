
const { channels } = require('../shared/constants.js');
const { ipcMain } = require('electron');

module.exports = {
    initIPC: function () {
        //get array of rpk names in the rpk directory
        ipcMain.on(channels.GET_RPKS, (event, arg) => {
            const fs = require("fs");
            const rpkList = fs.readdirSync("D:\\Projects/Quickapp_Engine/rpks");
            event.sender.send(channels.GET_RPKS, rpkList);
        })

        //other ipc requests from other channels will be added here
    }
}


