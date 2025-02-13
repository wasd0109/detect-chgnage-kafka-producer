export type ChangeFlags ={
    nogizaka:boolean
    sakurazaka:boolean
    hinatazaka:boolean
    bokuao:boolean
}

const generateMessage = (changeFlags:ChangeFlags)=>{
    return Object.keys(changeFlags).filter(key=>changeFlags[key]).map(key=>({
       value:key
    }))

}

export {generateMessage}