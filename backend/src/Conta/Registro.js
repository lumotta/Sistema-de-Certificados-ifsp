const {app} = require('../express'); //Importa o objeto app do arquivo express.js para configurar as rotas e iniciar o servidor
const Usuario = require('./Usuario');

let confirmacao = false; //Variável para controlar a confirmação do registro, inicialmente definida como false
let error = false; //Variável para controlar a ocorrência de erros, inicialmente definida como false

const dominio = 'ifsp.edu.br'



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




app.post("/registro/confirmacao", function(req, res) {

        var nome = req.body.nome; //Extrai o valor do campo "nome" do corpo da requisição POST, permitindo acessar o nome do usuário enviado pelo cliente
        var email = req.body.email;
        var senha = req.body.senha; //Extrai o valor do campo "senha" do corpo da requisição POST, permitindo acessar a senha do usuário enviado pelo cliente
        
        const dominiodigitado = email.split('@')[1]

        if(dominiodigitado != dominio)
        {
            error = true
            nome = "";
            email = "";
            senha = "";
            
        }
        if(nome === "" || email === "" || senha === "") { //Verifica se algum dos campos do formulário está vazio, indicando que o usuário não preencheu todos os campos necessários para o registro
            error = true; //Define a variável "error" como true, indicando que ocorreu um erro durante o processo de registro, o que pode ser usado para exibir uma mensagem de erro na página de registro ou para outras lógicas relacionadas ao estado de erro durante o registro
            nome = "";
            email = "";
            senha = "";
        }
        else {
            Usuario.create({
                nome: nome, //Pega o valor do campo "nome" do formulário enviado pelo cliente e atribui ao campo "nome" do modelo "Usuario"
                email: email, //Pega o valor do campo "email" do formulário enviado pelo cliente e atribui ao campo "email" do modelo "Usuario"
                senha: senha}) //Pega o valor do campo "senha" do formulário enviado pelo cliente e atribui ao campo "senha" do modelo "Usuario"


            confirmacao = true; //Define a variável "confirmacao" como true, indicando que o registro foi confirmado com sucesso, o que pode ser usado para exibir uma mensagem de confirmação na página de login ou para outras lógicas relacionadas ao estado de confirmação durante o registro
            nome = "";
            email = "";
            senha = "";

        }
        res.redirect("/registro")
    });

    module.exports = confirmacao; //Exporta a variável "confirmacao" para ser usada em outros arquivos, como src/server.js, permitindo controlar o estado de confirmação do registro em diferentes partes do aplicativo