const {app} = require('../express'); //Importa o objeto app do arquivo express.js para configurar as rotas e iniciar o servidor
const {handlebarsConfig} = require('../express'); //Importa a função handlebarsConfig do arquivo express.js para configurar o handlebars e o body-parser
const Usuario = require('./Usuario'); //Importa o modelo "Usuario" para interagir com a tabela "usuarios" no banco de dados

handlebarsConfig(app); //Chama a função handlebarsConfig para configurar o handlebars e o body-parser, permitindo renderizar templates e lidar com dados de formulários

let erro = false; //Declara uma variável "erro" e a inicializa como false, que pode ser usada para indicar se ocorreu um erro durante o processo de login

let nome = ""; //Declara uma variável "nome" e a inicializa como uma string vazia, que pode ser usada para armazenar o nome do usuário durante o processo de login ou para outras finalidades relacionadas ao nome do usuário

app.get("/login", (req, res) => {
    if (erro) {
        res.render("login", {erro: true}); 
        erro = false; //Redefine a variável "erro" para false após renderizar a página de login com a mensagem de erro, permitindo que a mensagem de erro seja exibida apenas uma vez e não persista em futuras tentativas de login
    }
    else {
        res.render("login");
    }
});

app.post("/login/confirmacao", async (req, res) => { 
    const {email, senha} = req.body; //Extrai os parâmetros "email" e "senha" do corpo da requisição POST, permitindo acessar os dados de login enviados pelo cliente
    try {
        const usuario = await Usuario.findOne({where: {email: email, senha: senha}}); //Busca um usuário no banco de dados que corresponda ao email e senha fornecidos, usando o método findOne do modelo "Usuario" para verificar se as credenciais de login são válidas
        if (usuario) {
            nome = usuario.nome; //Armazena o nome do usuário encontrado em uma variável global
            res.redirect("/home"); //Redireciona o usuário para a página inicial ou dashboard após um login bem-sucedido, permitindo que ele acesse as funcionalidades do sistema
        } else {
            res.redirect("/login"); //Redireciona o usuário de volta para a página de login, permitindo que ele tente fazer login novamente se as credenciais estiverem incorretas
            erro = true; //Define a variável "erro" como true, indicando que ocorreu um erro durante o processo de login, o que pode ser usado para exibir uma mensagem de erro na página de login ou para outras lógicas relacionadas ao estado de erro durante o login
        }
    } catch (error) {
        console.error("Erro ao realizar login:", error); //Exibe um erro no console se ocorrer algum problema durante a consulta ao banco de dados
        res.status(500).send("Ocorreu um erro ao realizar o login."); //Envia uma resposta de erro ao cliente se ocorrer um problema durante a consulta ao banco de dados
    }

});

