"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FETCH_HEADER = void 0;
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
