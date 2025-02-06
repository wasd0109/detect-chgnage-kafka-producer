// import { Kafka } from 'kafkajs';

import { initDb } from './repository/SQLiteRepository';
import { detectChanges } from './services/ScrapingService/scrapingService';

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['kafka1:9092', 'kafka2:9092'],
// })

const main =async ()=>{
  const conn =await initDb();
  console.info("Detecting Sakurazaka blog")
  await detectChanges("https://sakurazaka46.com/s/s46/diary/blog/list?ima=0000",conn)

  console.info("Program Exit")

  process.exit()
}

main()
