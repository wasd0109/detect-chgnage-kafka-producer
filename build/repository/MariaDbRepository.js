"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = void 0;
const mariadb = require("mariadb");
const url = "mariadb://kinching.a.cheung:bpsbpsbps@localhost:3306/blog_house";
const initDb = async () => {
    return await mariadb.createConnection(url);
};
exports.initDb = initDb;
