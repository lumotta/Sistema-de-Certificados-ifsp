const database = require('./src/config/database'); //Pega o módulo de conexão com o banco de dados criado em src/config/database.js
const server = require('./src/express'); //Pega o módulo do servidor criado em src/server.js
const {app} = require('./src/express'); //Pega o módulo do Express criado em src/express.js










app.listen(8080, () => {
    console.log('Servidor ligou!!!');
}); //Inicia o servidor na porta 8080 e exibe uma mensagem no console quando estiver pronto
