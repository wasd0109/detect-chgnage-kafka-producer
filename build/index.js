"use strict";
// import { Kafka } from 'kafkajs';
Object.defineProperty(exports, "__esModule", { value: true });
const SQLiteRepository_1 = require("./repository/SQLiteRepository");
const scrapingService_1 = require("./services/ScrapingService/scrapingService");
// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['kafka1:9092', 'kafka2:9092'],
// })
const main = async () => {
    const conn = await (0, SQLiteRepository_1.initDb)();
    console.info("Detecting Sakurazaka blog");
    await (0, scrapingService_1.detectChanges)("https://sakurazaka46.com/s/s46/diary/blog/list?ima=0000", conn);
    console.info("Program Exit");
    process.exit();
};
main();
