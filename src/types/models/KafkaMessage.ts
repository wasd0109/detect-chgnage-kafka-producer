type KafkaMessage = [key:string,value:MessageContent]

type MessageContent={
    id:string
    type:"blog-change"
}