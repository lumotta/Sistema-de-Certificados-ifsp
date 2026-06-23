const {handlebars} = require("../express")
const {app} = require('../express'); //Importa o objeto app do arquivo express.js para configurar as rotas e iniciar o servidor
const Participante = require("./Participante")



app.get("/participante/inscrever", (req, res) => {

    res.render('inscrever')

})

app.post("/participante/inscrevendo", async (req, res) => {

    const{nome, cpf, instituicao, email} = req.body

    try{
        await Participante.create({
            nome: nome,
            cpf: cpf,
            instituicao: instituicao,
            email: email

        })
    } catch (error){
        console.error("Erro ao inscrever participante", error)
        res.status(500).send("Erro ao inscrever")
    }


})