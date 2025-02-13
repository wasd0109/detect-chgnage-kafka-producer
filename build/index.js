"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Kafka } from 'kafkajs';
require("dotenv/config");
const DbRepository_1 = require("./repository/DbRepository");
const producerService_1 = require("./services/ProducerService/producerService");
const scrapingService_1 = require("./services/ScrapingService/scrapingService");
// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['kafka1:9092', 'kafka2:9092'],
// })
const main = async () => {
    const conn = await (0, DbRepository_1.initDb)();
    const produce = (0, producerService_1.initKafka)();
    console.info("Detecting Nogizaka blog");
    const hasNogiChanged = await (0, scrapingService_1.detectChanges)(conn, "https://www.nogizaka46.com/s/n46/diary/MEMBER");
    console.info("Detecting Sakurazaka blog");
    const hasSakuraChanged = await (0, scrapingService_1.detectChanges)(conn, "https://sakurazaka46.com/s/s46/diary/blog/list?ima=0000");
    if (true) {
        const result = await produce('blog_changed', [
            {
                key: "url",
                value: "https://www.nogizaka46.com/s/n46/diary/MEMBER"
            },
            {
                key: "url",
                value: "https://sakurazaka46.com/s/s46/diary/blog/list?ima=0000"
            }
        ]);
        console.log(result);
    }
    console.info("Program Exit");
    process.exit();
};
main();
