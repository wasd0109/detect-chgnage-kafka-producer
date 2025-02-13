"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Kafka } from 'kafkajs';
require("dotenv/config");
const DbRepository_1 = require("./repository/DbRepository");
const producerService_1 = require("./services/ProducerService/producerService");
const scrapingService_1 = require("./services/ScrapingService/scrapingService");
const FetchConstant_1 = require("./constants/FetchConstant");
const messageUtil_1 = require("./utils/messageUtil");
// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['kafka1:9092', 'kafka2:9092'],
// })
const main = async () => {
    const db = await (0, DbRepository_1.initDb)();
    const produce = (0, producerService_1.initKafka)();
    const results = { nogizaka: await (0, scrapingService_1.detectChanges)(db, FetchConstant_1.NOGIZAKA_BLOG_URL),
        sakurazaka: await (0, scrapingService_1.detectChanges)(db, FetchConstant_1.SAKURAZAKA_BLOG_URL),
        hinatazaka: await (0, scrapingService_1.detectChanges)(db, FetchConstant_1.HINATAZAKA_BLOG_URL),
        bokuao: await (0, scrapingService_1.detectChanges)(db, FetchConstant_1.BOKUAO_BLOG_URL)
    };
    console.log((0, messageUtil_1.generateMessage)(results));
    const result = await produce('blog_changed', (0, messageUtil_1.generateMessage)(results));
    console.info("Program Exit");
    process.exit();
};
main();
