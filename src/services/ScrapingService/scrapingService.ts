import axios from 'axios';
import * as cheerio from 'cheerio';
import { FETCH_HEADER } from '../../constants/FetchConstant';
import { generateSha1Hash } from '../../utils/hashUtil';
import axiosRetry from 'axios-retry';
import { Client } from 'pg';
import { getHashByUrl, saveHashByUrl } from '../../repository/DbRepository';

axiosRetry(axios, { retries: 5 });


const fetchPage = async (url: string) => {
    const { data } = await axios.get(url,{headers:FETCH_HEADER});
    return data;
};

const parseHTML = (html:string)=>{
    const $ = cheerio.load(html)
    return $('body').text()
}

const saveHash = async (url:string,html:string,db:Client)=>{
    return await saveHashByUrl(url,html,db)
}

const getSavedHash = async(url:string,db:Client)=>{
    const rows = await (await getHashByUrl(url,db)).rows
    const row = rows[0]

    return row?row.hash:"";
}



const detectChanges = async (db:Client,url:string) =>{
    console.log(`Detecting ${url}`)
    
    const currentHtml = parseHTML(await fetchPage(url));

    const currentHash = generateSha1Hash(currentHtml);
    const savedHash = await getSavedHash(url,db);

    if(savedHash&&currentHash!==savedHash){
        console.info("Newer version of the site exist");
        await saveHash(url,currentHash,db)
        console.info("Newer version of site saved")
        return true
    }
    else if(!savedHash){
        console.info("New key");
        await saveHash(url,currentHash,db)
        console.info(`HTML for key ${url} saved`)
        return true
    }
    else{
        console.info("No change detected")
        return false
    }
}

export { detectChanges };