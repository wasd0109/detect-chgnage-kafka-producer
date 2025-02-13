"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessage = void 0;
const generateMessage = (changeFlags) => {
    return Object.keys(changeFlags).filter(key => changeFlags[key]).map(key => ({
        value: key
    }));
};
exports.generateMessage = generateMessage;
