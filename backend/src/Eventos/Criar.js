const {handlebars} = require("../express")
const {app} = require('../express'); //Importa o objeto app do arquivo express.js para configurar as rotas e iniciar o servidor
const Evento = require("./Evento")

app.get("/criar-evento", (req, res) => {
    res.render("evento_criacao"); //Renderiza o template "criar-evento.handlebars" para exibir a página de criação de eventos para o usuário
});


app.post("/criar-evento/confirmacao", async (req, res) => {
    const {titulo, descricao, data, carga_horaria} = req.body; //Extrai os parâmetros "titulo", "descricao", "data" e "carga_horaria" do corpo da requisição POST, permitindo acessar os dados do evento enviados pelo cliente
    try {
        await Evento.create({
            titulo: titulo, //Pega o valor do campo "titulo" do formulário enviado pelo cliente e atribui ao campo "titulo" do modelo "evento"
            descricao: descricao, //Pega o valor do campo "descricao" do formulário enviado pelo cliente e atribui ao campo "descricao" do modelo "evento"
            data_evento: data, //Pega o valor do campo "data" do formulário enviado pelo cliente e atribui ao campo "data" do modelo "evento"
            carga_horaria: carga_horaria //Pega o valor do campo "carga_horaria" do formulário enviado pelo cliente e atribui ao campo "carga_horaria" do modelo "evento"
            }); //Cria um novo registro de evento no banco de dados usando o modelo "evento" e os dados extraídos da requisição, permitindo armazenar as informações do evento criado pelo usuário
        
            res.send("Evento criado com sucesso!"); //Envia uma resposta indicando que o evento foi criado com sucesso, permitindo informar o usuário sobre o resultado da criação do evento

    } catch (error) {
        console.error("Erro ao criar evento:", error);
        res.status(500).send("Ocorreu um erro ao criar o evento."); //Envia uma resposta de erro ao cliente se ocorrer algum problema durante a criação do evento, permitindo informar o usuário sobre o resultado da tentativa de criação do evento
    }
});



