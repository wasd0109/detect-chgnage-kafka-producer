import * as mariadb from 'mariadb';

const url = "mariadb://kinching.a.cheung:bps@localhost:3306/blog_house";

const initDb =async ()=>{
   return await mariadb.createConnection(url)
}

export{ initDb}