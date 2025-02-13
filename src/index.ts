// import { Kafka } from 'kafkajs';
import 'dotenv/config'
import { initDb } from './repository/DbRepository';
import { initKafka } from './services/ProducerService/producerService';
import { detectChanges } from './services/ScrapingService/scrapingService';

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['kafka1:9092', 'kafka2:9092'],
// })

const main =async ()=>{
  const conn =await initDb();
  const produce = initKafka();

  

  console.info("Detecting Nogizaka blog")
  const hasNogiChanged=await detectChanges(conn,"https://www.nogizaka46.com/s/n46/diary/MEMBER")

  console.info("Detecting Sakurazaka blog")
  const hasSakuraChanged = await detectChanges(conn,"https://sakurazaka46.com/s/s46/diary/blog/list?ima=0000")

  if(true){
    const result = await produce('blog_changed',[
      {
      key:"url",
      value:"https://www.nogizaka46.com/s/n46/diary/MEMBER"
      }, 
      {
        key:"url",
        value:"https://sakurazaka46.com/s/s46/diary/blog/list?ima=0000"
      }])
      
    console.log(result)
  }

  console.info("Program Exit")
  process.exit()
}

main()
