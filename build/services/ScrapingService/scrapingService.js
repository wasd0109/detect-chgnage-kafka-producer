"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectChanges = void 0;
const axios_1 = require("axios");
const cheerio = require("cheerio");
const FetchConstant_1 = require("../../constants/FetchConstant");
const hashUtil_1 = require("../../utils/hashUtil");
const axios_retry_1 = require("axios-retry");
const DbRepository_1 = require("../../repository/DbRepository");
(0, axios_retry_1.default)(axios_1.default, { retries: 5 });
const fetchPage = async (url) => {
    const { data } = await axios_1.default.get(url, { headers: FetchConstant_1.FETCH_HEADER });
    return data;
};
const parseHTML = (html) => {
    const $ = cheerio.load(html);
    return $.html();
};
const saveHash = async (url, html, db) => {
    return await (0, DbRepository_1.saveHashByUrl)(url, html, db);
};
const getSavedHash = async (url, db) => {
    const rows = await (await (0, DbRepository_1.getHashByUrl)(url, db)).rows;
    const row = rows[0];
    return row ? row.hash : "";
};
const detectChanges = async (db, url) => {
    console.log(`Detecting ${url}`);
    const currentHtml = parseHTML(await fetchPage(url));
    const currentHash = (0, hashUtil_1.generateSha1Hash)(currentHtml);
    const savedHash = await getSavedHash(url, db);
    if (savedHash && currentHash !== savedHash) {
        console.info("Newer version of the site exist");
        await saveHash(url, currentHash, db);
        console.info("Newer version of site saved");
        return true;
    }
    else if (!savedHash) {
        console.info("New key");
        await saveHash(url, currentHash, db);
        console.info(`HTML for key ${url} saved`);
        return true;
    }
    else {
        console.info("No change detected");
        return false;
    }
};
exports.detectChanges = detectChanges;
