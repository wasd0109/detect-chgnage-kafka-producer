// import { Kafka } from 'kafkajs';
import 'dotenv/config'
import { initDb } from './repository/DbRepository';
import { initKafka } from './services/ProducerService/producerService';
import { detectChanges } from './services/ScrapingService/scrapingService';
import { BOKUAO_BLOG_URL, HINATAZAKA_BLOG_URL, NOGIZAKA_BLOG_URL, SAKURAZAKA_BLOG_URL } from './constants/FetchConstant';
import { ChangeFlags, generateMessage } from './utils/messageUtil';

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['kafka1:9092', 'kafka2:9092'],
// })

const main =async ()=>{
  const db =await initDb();
  const produce = initKafka();

  const results:ChangeFlags = {nogizaka:await detectChanges(db,NOGIZAKA_BLOG_URL),
    sakurazaka:await detectChanges(db,SAKURAZAKA_BLOG_URL),
    hinatazaka:await detectChanges(db,HINATAZAKA_BLOG_URL),
    bokuao:await detectChanges(db,BOKUAO_BLOG_URL)
  }

  console.log(generateMessage(results))
  const result = await produce('blog_changed',generateMessage(results))
    

  console.info("Program Exit")
  process.exit()
}

main()
