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

const fetchTarget = {
  nogizaka:NOGIZAKA_BLOG_URL,
  sakurazaka:SAKURAZAKA_BLOG_URL,
  hinatazaka:HINATAZAKA_BLOG_URL,
  bokuao:BOKUAO_BLOG_URL,
}

const main =async ()=>{
  const db =await initDb();
  const produce = initKafka();

  const results:ChangeFlags={nogizaka:false,sakurazaka:false,hinatazaka:false,bokuao:false};

  for(const target in fetchTarget){
    try{
      const hasChanged = await detectChanges(db,fetchTarget[target]);
      if(hasChanged){
        results[target]=hasChanged
      }
    }catch(err){
      continue;
    }
  }

  if( Object.values(results).includes(true)){
    const kafkaResult = await produce('blog_changed',generateMessage(results))

    console.info("Message sent")
    console.log(kafkaResult)
  }
  
    
  console.info("Program Exit")
  process.exit()
}

main()
