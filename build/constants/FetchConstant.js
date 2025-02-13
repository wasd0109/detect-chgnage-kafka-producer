"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOKUAO_BLOG_URL = exports.HINATAZAKA_BLOG_URL = exports.SAKURAZAKA_BLOG_URL = exports.NOGIZAKA_BLOG_URL = exports.FETCH_HEADER = void 0;
const FETCH_HEADER = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br', // Support for compressed responses
    'Connection': 'keep-alive',
    'Referer': 'https://example.com', // Optional: Set the referer to the target website or a related page
    'DNT': '1', // Do Not Track header
    'Upgrade-Insecure-Requests': '1',
};
exports.FETCH_HEADER = FETCH_HEADER;
const NOGIZAKA_BLOG_URL = "https://www.nogizaka46.com/s/n46/diary/MEMBER";
exports.NOGIZAKA_BLOG_URL = NOGIZAKA_BLOG_URL;
const SAKURAZAKA_BLOG_URL = "https://sakurazaka46.com/s/s46/diary/blog/list?ima=0000";
exports.SAKURAZAKA_BLOG_URL = SAKURAZAKA_BLOG_URL;
const HINATAZAKA_BLOG_URL = "https://www.hinatazaka46.com/s/official/diary/member?ima=0000";
exports.HINATAZAKA_BLOG_URL = HINATAZAKA_BLOG_URL;
const BOKUAO_BLOG_URL = "https://bokuao.com/blog/list/1/0/";
exports.BOKUAO_BLOG_URL = BOKUAO_BLOG_URL;
