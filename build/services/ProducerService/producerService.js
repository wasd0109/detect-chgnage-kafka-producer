"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initKafka = void 0;
const fs = require("fs");
const kafka_javascript_1 = require("@confluentinc/kafka-javascript");
const { Kafka } = kafka_javascript_1.KafkaJS;
const generateConfig = () => {
    if (process.env.NODE_ENV == "development") {
        return {
            "bootstrap.servers": process.env.KAFKA_BOOTSTRAP_SERVER,
            "security.protocol": process.env.KAFKA_SECURITY_PROTOCOL,
            "client.id": process.env.KAFKA_CLIENT_ID
        };
    }
    else
        return {
            "bootstrap.servers": process.env.KAFKA_BOOTSTRAP_SERVER,
            "security.protocol": process.env.KAFKA_SECURITY_PROTOCOL,
            "sasl.mechanism": process.env.KAFKA_SASL_MECHANISM,
            "sasl.username": process.env.KAFKA_SASL_USERNAME,
            "sasl.password": process.env.KAFKA_SASL_PASSWORD,
            "client.id": process.env.KAFKA_CLIENT_ID
        };
};
const initKafka = () => {
    const config = generateConfig();
    return produce(config);
};
exports.initKafka = initKafka;
function readConfig(fileName) {
    const data = fs.readFileSync(fileName, "utf8").toString().split("\n");
    return data.reduce((config, line) => {
        const [key, value] = line.split("=");
        if (key && value) {
            config[key] = value;
        }
        return config;
    }, {});
}
const produce = (config) => async (topic, messages) => {
    // create a new producer instance
    const producer = new Kafka(config).producer();
    // connect the producer to the broker
    await producer.connect();
    // send a single message
    const produceRecord = await producer.send({
        topic,
        messages,
    });
    // disconnect the producer
    await producer.disconnect();
    return produceRecord;
};
