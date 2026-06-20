
const db = require('../config/database')



const Codigo = db.sequelize.define('codigos_verificacao', {
    codigo: {
        type: db.Sequelize.STRING,
        notNull: true
    },
    email:{
        type: db.Sequelize.STRING,
        notNull: true
    },
    utilizado:{
        type: db.Sequelize.STRING,
        notNull: false
    },
    data_geracao:{
        type: db.Sequelize.DATE,
        notNull: true
    },
    data_utilizacao:{
        type: db.Sequelize.DATE,
        notNull: false
    }
}, {

    tableName: 'codigos_verificacao',
    timestamps: false

    }
)

module.exports = Codigo