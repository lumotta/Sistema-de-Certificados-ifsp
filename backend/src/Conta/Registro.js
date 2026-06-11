const {app} = require('../express'); //Importa o objeto app do arquivo express.js para configurar as rotas e iniciar o servidor
const Usuario = require('./Usuario');

let confirmacao = false; //Variável para controlar a confirmação do registro, inicialmente definida como false
let error = false; //Variável para controlar a ocorrência de erros, inicialmente definida como false


app.get("/registro", (req, res) => {
    if (confirmacao) {
        res.render("registro", {confirmacao: true}); //avisa o usuario que seu registro foi confirmado
        confirmacao = false; //reseta a variável de confirmação para evitar que a mensagem seja exibida novamente em futuras visitas à página de registro
    }
    if (error) {
        res.render("registro", {error: true});
        error = false; //reseta a variável de erro para evitar que a mensagem seja exibida novamente em futuras visitas à página de registro
    }
    if (!confirmacao && !error) {
        res.render("registro"); //Renderiza o template "registro.handlebars" para exibir a página de registro para o usuário
    }
}); //Configura uma rota GET para "/registro" que renderiza o template "formulario.handlebars" quando acessada, permitindo exibir um formulário para o usuário preencher e enviar os dados de registro




app.post("/registro/confirmado", function(req, res) {
    Usuario.create({
        nome: req.body.nome, //Pega o valor do campo "nome" do formulário enviado pelo cliente e atribui ao campo "nome" do modelo "Usuario"
        email: req.body.email, //Pega o valor do campo "email" do formulário enviado pelo cliente e atribui ao campo "email" do modelo "Usuario"
        senha: req.body.senha //Pega o valor do campo "senha" do formulário enviado pelo cliente e atribui ao campo "senha" do modelo "Usuario"
    }).then(function() {
        confirmacao = true; //Define a variável de confirmação como true para indicar que o registro foi confirmado
        res.redirect("/registro"); //Redireciona o cliente para a rota "/registro" para exibir a mensagem de confirmação
    }).catch(function(erro) {
        error = true; //Define a variável de erro como true para indicar que houve um problema ao criar o usuário
        res.redirect("/registro"); //Redireciona o cliente para a rota "/registro" para exibir a mensagem de erro
    });
});