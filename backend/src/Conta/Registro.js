const {app} = require('../express') //Importa o objeto app do arquivo express.js para configurar as rotas e iniciar o servidor
const Usuario = require('./Usuario')//Importa o bando dos usuarios
const Codigo = require('./Codigo')//Importa o banco do código
const transporter = require('../config/nodemailer')//Importa o modulo que envia emails
const bcrypt = require('bcrypt')//Importa o bcrypt que é uma forma de criptografia
const crypto = require('crypto')//Importa modulo que será usado na criação dos códigos de confirmação
const { DATE } = require('sequelize')

require('dotenv').config();

const dominio = 'aluno.ifsp.edu.br'//dominio que será obrigatorio na criação da conta
const expirar = 10 * 60 * 1000 //Diz que o código expira após 10minutos



async function emailJaExiste(mail) { //função que verifica se email já existe
    const conta = await Usuario.findOne({where: {email:mail}})
    return conta
}


app.get("/registro", (req, res) => {
        res.render("registro",
             {erro: req.flash('erro')[0],
            confirmado: req.flash('confirmado')[0]})
        
}); //Configura uma rota GET para "/registro" que renderiza o template "formulario.handlebars" quando acessada, permitindo exibir um formulário para o usuário preencher e enviar os dados de registro




app.post("/registro/confirmacao", async function(req, res) { //Post que verificará se o usuario digitou tudo corretamente

        const {nome, email, senha, senhaN} = req.body //Extrai o valor do campo "nome" do corpo da requisição POST, permitindo acessar o nome do usuário enviado pelo cliente

        if(senha != senhaN){
            req.flash('erro', "Você digitou senhas diferentes")//Retorna uma mensagem de erro
            return res.redirect('/registro')
        }
        else{


            const criptoS = await bcrypt.hash(senha, 10);

            req.session.nome = nome
            req.session.email = email
            req.session.senha = criptoS

            const dominiodigitado = req.session.email.split('@')[1]

            req.session.existe =  await emailJaExiste(req.session.email)
            if( req.session.existe != null)
            {
                req.flash('erro', 'Já existe esse email no banco de dados')//Retorna uma mensagem de erro
                return res.redirect('/registro')
            }


            else if(dominiodigitado != dominio){
                req.flash('erro', 'Dominio de email incorreto')//Retorna uma mensagem de erro
                return res.redirect('/registro')
            }
        
            else if(req.session.nome === "" || req.session.email === "" || req.session.senha === ""){
                req.flash('erro', 'Falta dados')//Retorna uma mensagem de erro
                return res.redirect('/registro')
            } 
         
            else {
                   return res.redirect('/registro/codigo')
            }
        }})


    app.get('/registro/codigo', async function (req, res) { //Get para que o usuario digite o código que foi enviado ao email

        if (!req.session.jafoi){
            const token = crypto.randomBytes(32).toString('hex')
            req.session.token = token

            Codigo.create({
                codigo: req.session.token,
                email: req.session.email,
                utilizado: 0,
                data_geracao: Date.now(),
                data_utilizacao: null
            })

            

            req.session.expiracao = new Date(Date.now() + expirar)

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
            }

            else{
                res.render('codigo', {erro: req.flash('erro')[0]})//Mostra a mensagem de erro caso o usuario tenha retornado
                req.session.jafoi = false
            }
        
        })
        

    app.post('/registro/codigo/confirmacao', (req, res) => {
            const {codigo} = req.body //recebe o código digitado no formulario

            req.session.codigo = codigo //O código da sessão

            if(req.session.codigo == req.session.token && new Date(req.session.expiracao) >= Date.now()) //Compara para ver se o código foi digitado corretamente
            {
                Usuario.create({
                    nome: req.session.nome, //Pega o valor do campo "nome" do formulário enviado pelo cliente e atribui ao campo "nome" do modelo "Usuario"
                    email: req.session.email, //Pega o valor do campo "email" do formulário enviado pelo cliente e atribui ao campo "email" do modelo "Usuario"
                    senha: req.session.senha}) //Pega o valor do campo "senha" do formulário enviado pelo cliente e atribui ao campo "senha" do modelo "Usuario"
                    req.flash('confirmado', 'Conta criada com sucesso') //Retorna uma mensagem de confirmação

                    Codigo.update({
                        utilizado: 1,
                        data_utilizacao: Date.now()},
                        {
                            where: {email: req.session.email}
                    })

                    res.redirect('/registro')

            }
            else if(new Date(req.session.expiracao) <= Date.now()) //Busca ver se código já foi expirado
            {
                req.flash('erro','Codigo expirado') //Retorna uma mensagem de erro
                res.redirect('/registro')
            }

            else{
                req.flash('erro','Codigo digitado incorretamente')//Retorna uma mensagem de erro
                req.session.jafoi = true
                res.redirect('/registro/codigo')
            }
            
            
    })