"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveHashByUrl = exports.getHashByUrl = exports.initDb = void 0;
const pg_1 = require("pg");
const generateConfig = () => {
    if (process.env.NODE_ENV == "development") {
        return {
            connectionString: process.env.DB_CONNECTION_STRING,
        };
    }
    else
        return {
            connectionString: process.env.DB_CONNECTION_STRING,
            ssl: {
                rejectUnauthorized: false
            }
        };
};
const initDb = async () => {
    const config = generateConfig();
    const client = new pg_1.Client(config);
    await client.connect();
    return client;
};
exports.initDb = initDb;
const getHashByUrl = async (url, db) => {
    const query = 'SELECT hash FROM site_state WHERE url = $1 LIMIT 1';
    return await db.query(query, [url]);
};
exports.getHashByUrl = getHashByUrl;
const saveHashByUrl = async (url, html, db) => {
    const query = `INSERT INTO site_state (url, hash,create_date,update_date)
                  VALUES ($1, $2, now(), now())
                  ON CONFLICT (url) 
                  DO UPDATE SET hash = EXCLUDED.hash, update_date = EXCLUDED.update_date;
                  `;
    return await db.query(query, [url, html]);
};
exports.saveHashByUrl = saveHashByUrl;
