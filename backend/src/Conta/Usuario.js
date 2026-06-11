const db = require('../config/database'); //Importa o módulo db para interagir com o banco de dados


const Usuario = db.sequelize.define('usuarios', {
    nome: {
        type: db.Sequelize.STRING, //Define o campo "nome" como uma string
        notNull: true //Define o campo "nome" como obrigatório (não pode ser nulo)
    },
    email: {
        type: db.Sequelize.STRING ,//Define o campo "email" como uma string
        notNull: true //Define o campo "email" como obrigatório (não pode ser nulo)
    },
    senha: {
        type: db.Sequelize.STRING, //Define o campo "senha" como uma string
        notNull: true //Define o campo "senha" como obrigatório (não pode ser nulo)
    }
}, 
    {
        tableName: 'usuarios', //Especifica o nome da tabela no banco de dados
        timestamps: false //Desativa os campos de timestamp (createdAt e updatedAt) que o Sequelize adiciona por padrão
    }
);

module.exports = Usuario; //Exporta o modelo "Usuario" para ser usado em outros arquivos

