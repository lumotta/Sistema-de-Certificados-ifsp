const {app} = require("../express")
const handlebars = require("../express");
const Evento = require("./Evento"); //Importa o modelo "Evento" do arquivo "Evento.js" para interagir com a tabela de eventos no banco de dados



app.get('/ver', async (req, res) => {
    const ev = await Evento.findAll()
    res.render('evento_ver', {posts:ev.map(e => e.get({plain: true}))})
})
