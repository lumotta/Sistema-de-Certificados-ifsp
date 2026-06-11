require('dotenv').config(); //Carrega as variáveis de ambiente do arquivo .env
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env; //Desestrutura as variáveis de ambiente para facilitar o uso


const Sequelize = require('sequelize'); //Importa o módulo sequelize

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
});




module.exports = {
    sequelize: sequelize, //Exporta a instância do sequelize para ser usada em outros arquivos, como src/server.js
    Sequelize: Sequelize //Exporta o módulo Sequelize para ser usado em outros arquivos, como src/server.js
};






sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });