require('dotenv').config();
const sql = require('mssql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const users = [];

app.post('/auth/signup', (req, res)=>{
    const { usuario, senha } = req.body;

    if(!usuario || !senha){
        return res.status(400).send('Usuário e senha são obrigatórios!');
    }

    const userExists = users.find(u => u.usuario === usuario);
    if(userExists) {
        return res.status(400).send('Usuário já existe');
    }

    const newUser = { usuario, senha };
    users.push(newUser);
    
    const token = jwt.sign({ usuario }, 'secreta', { expiresIn: '1h' });
    res.json({ token });
});

app.get('/', (req, res)=>{
    res.send('FOI')
})

app.listen(3000, ()=>{
    console.log('Server is running🔥🔥');
});

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

// async function insertDB(content){
//     try{
//         let pool = await sql.connect(config);
//         const result =  await pool.request()
//             .query(`SELECT * FROM Teste`);
//         return console.log(result.recordset[0].nome);
//     }catch(error){
//         console.error('Erro ao inserir usuário: ', error);
//         throw error;
//     }finally{
//         sql.close();
//     }
// }


