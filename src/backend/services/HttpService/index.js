const axios = require("axios");
let HttpService = axios.create({ baseURL: "http://localhost:3000" });

module.exports = HttpService;
