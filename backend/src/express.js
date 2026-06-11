const express = require('express');
const {engine} = require('express-handlebars'); //Importa o módulo handlebars
const bodyparser = require('body-parser'); //Importa o módulo body-parser para lidar com dados de formulários



const app = express(); //Cria o objeto app que será a principal forma de configurar o servidor


//config
    //handlebars
function handlebarsConfig(app) {app.engine('handlebars', engine({defaultLayout: 'main'})); //cria uma função que poderá configurar o handlebars em outros modulos rapidamente
app.set('view engine', 'handlebars'); //Configura o handlebars como o mecanismo de visualização do Express, permitindo renderizar arquivos .handlebars como templates para as respostas do servidor
    //body-parser
app.use(bodyparser.urlencoded({extended: false})); //Configura o body-parser para lidar com dados de formulários enviados via POST, permitindo acessar os dados do formulário através do objeto req.body
app.use(bodyparser.json()); //Configura o body-parser para lidar com dados JSON enviados no corpo das requisições, permitindo acessar os dados JSON através do objeto req.body
}

handlebarsConfig(app); //Chama a função handlebarsConfig para configurar o handlebars e o body-parser, permitindo renderizar templates e lidar com dados de formulários

module.exports = {
    app: app, //Exporta o objeto app para ser usado em outros arquivos, como src/server.js
    handlebarsConfig: handlebarsConfig //Exporta a função handlebarsConfig para ser chamada em src/server.js para configurar o handlebars e o body-parser
};



const Registro = require('./Conta/Registro'); //Importa o módulo de registro para configurar as rotas relacionadas ao registro de usuários
const Login = require('./Conta/Login'); //Importa o módulo de login para configurar as rotas relacionadas ao login de usuários






/*
Quando for para mandar um arquivo HTML, usar o método sendFile() do objeto res, passando o caminho do arquivo como argumento. Exemplo:

app.get("/pagina", (req, res) => {
    res.sendFile(__dirname + "/pagina.html"); //Envia o arquivo "pagina.html" para o cliente quando acessar a rota "/pagina"
});



*/  