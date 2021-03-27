const sequelize = require('../connection/db');
const { DataTypes, Model, Sequelize} = require('sequelize');

class User extends Model{}

User.init({
    id:{
        type:DataTypes.INTEGER, 
        unique: true, 
        allowNull: false, 
        primaryKey:true, 
        autoIncrement: true
        },
    user:{
        type: DataTypes.STRING, 
        allowNull: false
         },
    pass:{
        type: DataTypes.STRING, 
        allowNull: false
         },
    mail:{
        type: DataTypes.STRING, 
        allowNull: false
         },
},  {
    sequelize,
    modelName:"user",
    tableName:"users",
    timestamps: false
})

module.exports = User