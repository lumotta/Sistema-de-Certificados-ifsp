const { where } = require("sequelize");
const {app} = require("../express")
const handlebars = require("../express");
const Evento = require("./Evento"); //Importa o modelo "Evento" do arquivo "Evento.js" para interagir com a tabela de eventos no banco de dados



app.get('/evento/ver', async (req, res) => {
    const ev = await Evento.findAll()
    res.render('evento_ver', {posts:ev.map(e => e.get({plain: true}))})
})


app.get('/evento/deletar/:id', (req, res) => {
    Evento.destroy({where: {
        'id': req.params.id
    }}).then( ()=> {res.send("Evento excluido")})
})

app.get('/evento/editar/:id', async (req, res) => {
    const evento = await  Evento.findOne({where:{'id': req.params.id}})  
    res.render('evento_editar',{id:req.params.id, titulo: evento.titulo, descricao:
         evento.descricao, 
         data: evento.data, 
         carga_horaria: evento.carga_horaria})
})

app.post('/evento/editado', async (req, res) =>{
    Evento.update({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        data: req.body.data,
        carga_horaria: req.body.carga_horaria
    },{where: {id: req.body.id }}).then( () => {res.redirect('/evento/ver')})

})