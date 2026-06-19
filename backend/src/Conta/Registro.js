const {app} = require('../express'); //Importa o objeto app do arquivo express.js para configurar as rotas e iniciar o servidor
const Usuario = require('./Usuario');
const transporter = require('../config/nodemailer')
const bcrypt = require('bcrypt')//Importa o bcrypt que é uma forma de criptografia
const crypto = require('crypto')
require('dotenv').config();


var jafoi
let confirmacao = false; //Variável para controlar a confirmação do registro, inicialmente definida como false
let error = false; //Variável para controlar a ocorrência de erros, inicialmente definida como false

const dominio = 'aluno.ifsp.edu.br'


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




app.post("/registro/confirmacao", async function(req, res) {

        const {nome, email, senha, senhaN} = req.body //Extrai o valor do campo "nome" do corpo da requisição POST, permitindo acessar o nome do usuário enviado pelo cliente

        if(senha != senhaN)
            error = true
        else{


            const criptoS = await bcrypt.hash(senha, 10);

            req.session.nome = nome
            req.session.email = email
            req.session.senha = criptoS

            const dominiodigitado = req.session.email.split('@')[1]

            if(dominiodigitado != dominio)
                error = true
            
            
        
            else if(req.session.nome === "" || req.session.email === "" || req.session.senha === "")//Verifica se algum dos campos do formulário está vazio, indicando que o usuário não preencheu todos os campos necessários para o registro
             error = true; //Define a variável "error" como true, indicando que ocorreu um erro durante o processo de registro, o que pode ser usado para exibir uma mensagem de erro na página de registro ou para outras lógicas relacionadas ao estado de erro durante o registro
         
            else {
                    res.redirect('/registro/codigo')
            }
        }
        if (error == true)
            {res.redirect("/registro")}
        })


    app.get('/registro/codigo', async function (req, res) {

        if (!jafoi){
            const token = crypto.randomBytes(32).toString('hex')
            req.session.token = token


            const mailOptions ={
                from: process.env.DB_EMAIL,
                to: req.session.email,
                subject:'test',
                text: req.session.token
                }

                await transporter.sendMail(mailOptions, (erro, info) => {
                if (erro) {
                 console.log(erro);
                } else {
                 console.log("Email enviado:", info.response);
                }})
            res.render('codigo') 
            }})
        
  
    module.exports = confirmacao; //Exporta a variável "confirmacao" para ser usada em outros arquivos, como src/server.js, permitindo controlar o estado de confirmação do registro em diferentes partes do aplicativo

    app.post('/registro/codigo/confirmacao', (req, res) => {
            const {codigo} = req.body

            req.session.codigo = codigo

            if(req.session.codigo == req.session.token)
            {
                Usuario.create({
                    nome: req.session.nome, //Pega o valor do campo "nome" do formulário enviado pelo cliente e atribui ao campo "nome" do modelo "Usuario"
                    email: req.session.email, //Pega o valor do campo "email" do formulário enviado pelo cliente e atribui ao campo "email" do modelo "Usuario"
                    senha: req.session.senha}) //Pega o valor do campo "senha" do formulário enviado pelo cliente e atribui ao campo "senha" do modelo "Usuario"
                    confirmacao = true
                    res.redirect('/registro')

            }

            else{
                jafoi = true 
                res.redirect('/registro/codigo')
            }
            
    })