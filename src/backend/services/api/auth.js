const { ipcConfig } = require("config");
const http = require("../HttpService/index.js");
const storage = require("#storageUtils");
module.exports = {
  [ipcConfig.channel.LOGIN]: async (event, email, password) => {
    const res = await http.post(`/public/auth/login`, { email, password });

    return res.data;
  },
  [ipcConfig.channel.REFRESH]: async (event) => {
    const res = await http.post("/public/auth/refresh", {
      refreshToken: storage.get(storage.key.REFRESH_TOKEN),
    });

    return res.data;
  },
};
