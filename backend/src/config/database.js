const mysql = require('mysql2/promise'); // Importa a biblioteca mysql2
require('dotenv').config(); // Carrega as variáveis do arquivo .env

// Cria um pool de conexões com o banco de dados
const pool = mysql.createPool({
    // Endereço do servidor do banco (localhost = seu computador)
    host: process.env.DB_HOST,
    // Usuário do banco de dados
    user: process.env.DB_USER,
    // Senha do usuário do banco
    password: process.env.DB_PASSWORD,
    // Nome do banco
    database: process.env.DB_NAME
});

// Exporta o pool para que outros arquivos
module.exports = pool;