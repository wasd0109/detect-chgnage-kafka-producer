"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectChanges = void 0;
const axios_1 = require("axios");
const cheerio = require("cheerio");
const fetchPage = async (url) => {
    const { data } = await axios_1.default.get(url);
    return data;
};
const parseHTML = (html) => {
    const $ = cheerio.load(html);
    return $.html();
};
const saveHTML = async (url, html, conn) => {
    const query = `  INSERT INTO site_state (\`key\`, content)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE content = VALUES(content)`;
    await conn.query(query, [url, html]);
};
// const check
const compareWithSavedHTML = async (url, html, conn) => {
    const query = 'SELECT content FROM site_state WHERE `key` = ? LIMIT 1';
    const rows = await conn.query(query, [url]);
    const savedHTML = rows[0];
    return savedHTML === html;
};
const detectChanges = async (url, conn) => {
    const currentHtml = parseHTML(await fetchPage(url));
    const changed = compareWithSavedHTML(url, currentHtml, conn);
    if (!changed) {
        console.info("Newer version of the site exist");
        saveHTML(url, currentHtml, conn);
        console.info("Newer version of site saved");
        return true;
    }
    else {
        console.info("No change detected");
        return false;
    }
};
exports.detectChanges = detectChanges;
