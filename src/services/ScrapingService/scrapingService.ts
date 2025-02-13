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
    return $.html()
}

const saveHash = async (url:string,html:string,db:Client)=>{
    return await saveHashByUrl(url,html,db)
}

const getSavedHash = async(url:string,db:Client)=>{
    const rows = await (await getHashByUrl(url,db)).rows
    const row = rows[0]

    return row?row.hash:"";
}

// const compareWithSavedHTML =async (url:string,html:string,conn:Client)=>{
//     const query = 'SELECT content FROM site_state WHERE `key` = ? LIMIT 1';
//     const rows = await conn.query(query,[url])
//     const savedHTML = rows[0]
//     // TODO fix, side effect
//     if(!rows.length){
//         saveHash(url,html,conn)
//     }

//     return savedHTML===html;
// }

const detectChanges = async (db:Client,url:string) =>{
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