import axios from 'axios';
import * as cheerio from 'cheerio';
import { html } from 'cheerio/dist/commonjs/static';
import { Connection } from 'mariadb';
import * as  fs from "node:fs"

const fetchPage = async (url: string) => {
    const { data } = await axios.get(url);

    return data;
};

const parseHTML = (html:string)=>{

    const $ = cheerio.load(html)
    return $.html()
}

const saveHTML = async (url:string,html:string,conn:Connection)=>{
    const query = `  INSERT INTO site_state (\`key\`, content)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE content = VALUES(content)`;
    await conn.query(query,[url,html])
}

// const check

const compareWithSavedHTML =async (url:string,html:string,conn:Connection)=>{
    const query = 'SELECT content FROM site_state WHERE `key` = ? LIMIT 1';
    const rows = await conn.query(query,[url])
    const savedHTML = rows[0]
    return savedHTML===html;
}

const detectChanges = async (url:string,conn:Connection) =>{
    const currentHtml = parseHTML(await fetchPage(url));
    const changed = compareWithSavedHTML(url,currentHtml,conn)
    if(!changed){
        console.info("Newer version of the site exist");
        saveHTML(url,currentHtml,conn)
        console.info("Newer version of site saved")

        return true
    }else{
        console.info("No change detected")
        return false
    }
}

export { detectChanges };