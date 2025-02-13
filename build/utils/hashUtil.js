"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSha1Hash = void 0;
// Importing 'crypto' module
const crypto = require("crypto");
// Create hash of SHA1 type
const generateSha1Hash = (text) => {
    return crypto.createHash('sha1')
        .update(text).digest('hex');
};
exports.generateSha1Hash = generateSha1Hash;
