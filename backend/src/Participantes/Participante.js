const db = require("../config/database")

const Participante = db.sequelize.define("participantes", {
    nome: {
        type: db.Sequelize.STRING,
        notNull: true
    },
    email: {
        type: db.Sequelize.STRING,
        notNull: true
    },
    cpf: {
        type: db.Sequelize.STRING,
        notNull: true
    },
    instituicao: {
        type: db.Sequelize.STRING,
        notNull: true
    }
},{
    tablename: 'participantes',
    timestamps: false
})


module.exports = Participante