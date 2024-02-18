//importing pg package
import pg from 'pg';
const{Pool}=pg;
//creating instanace for pool
export const pool=new Pool({
    user:'postgres',
    password:'1234',
    host:'localhost',
    port:5432,
    database:'steama_testdb'
});