const db = require('../config/database'); //Importa o módulo db para interagir com o banco de dados

const Evento = db.sequelize.define('eventos', {
    titulo: {
        type: db.Sequelize.STRING,
        notNull: true
    },
    data_evento: {
        type: db.Sequelize.DATE,
        notNull: true
    },
    carga_horaria: {
        type: db.Sequelize.INTEGER,
        notNull: true
    },
    descricao: {
        type: db.Sequelize.TEXT,
        notNull: true
    }
},
{   
    tableName: 'eventos', //Especifica o nome da tabela no banco de dados
    timestamps: false //Desativa os campos createdAt e updatedAt
});

module.exports = Evento; //Exporta o modelo Evento para ser utilizado em outras partes do aplicativo, permitindo criar, ler, atualizar e excluir registros de eventos no banco de dados
