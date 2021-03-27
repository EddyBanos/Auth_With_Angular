const Sequelize= require('sequelize');

const sequelize = new Sequelize('auth','root','admin1234',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize