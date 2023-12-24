
const { channels } = require('../shared/constants.js');
const { ipcMain,app } = require('electron');

module.exports = {
    initIPC: function () {
        //get array of rpk names in the rpk directory
        ipcMain.on(channels.GET_RPKS, (event, arg) => {
            const fs = require("fs");
            const rpkList = fs.readdirSync("C:\\Projects/Web UI Devkit/rpks");
            event.sender.send(channels.GET_RPKS, rpkList);
        })

        // quit the application
        ipcMain.on(channels.APP_EXIT, ()=>{
            app.quit();
        })
        //other ipc requests from other channels will be added here
    }
}


