require('dotenv').config();
const sql = require('mssql');

const config = {
    server: process.env.SERVER,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    options: {
        trustedConnection: false,
        encrypt: false,
        trustServerCertificate: true
    },
};

async function insertDB(content){
    try{
        let pool = await sql.connect(config);
        const result =  await pool.request()
            .query(`SELECT * FROM Teste`);
        return console.log(result.recordset);
    }catch(error){
        console.error('Erro ao inserir usuário: ', error);
        throw error;
    }finally{
        sql.close();
    }
}

insertDB('Rhuan');