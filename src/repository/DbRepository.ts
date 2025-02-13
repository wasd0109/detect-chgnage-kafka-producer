import { Client, ClientConfig } from 'pg';

const generateConfig = ():ClientConfig=>{
   if(process.env.NODE_ENV=="development"){
      return {
         connectionString: process.env.DB_CONNECTION_STRING,
      }
    }
    else return {
      connectionString: process.env.DB_CONNECTION_STRING,
      ssl: {
         rejectUnauthorized: false
      }
   }
}

const initDb = async () => {
   const config = generateConfig()
   const client = new Client(config);
   await client.connect();
   return client;
};

const getHashByUrl = async (url: string, db: Client) => {
   const query = 'SELECT hash FROM site_state WHERE url = $1 LIMIT 1';
   return await db.query(query, [url]);
};

const saveHashByUrl = async (url: string, html: string, db: Client) => {
   const query = `INSERT INTO site_state (url, hash,create_date,update_date)
                  VALUES ($1, $2, now(), now())
                  ON CONFLICT (url) 
                  DO UPDATE SET hash = EXCLUDED.hash, update_date = EXCLUDED.update_date;
                  `

   return await db.query(query, [url,html]);
};


export { initDb, getHashByUrl, saveHashByUrl };