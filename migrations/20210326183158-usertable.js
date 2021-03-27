'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
   return await queryInterface.createTable('users', { 
      id: {type:Sequelize.INTEGER, unique: true, allowNull: false, primaryKey:true, autoIncrement: true},
      user: {type:Sequelize.STRING, allowNull: false},
      pass: {type:Sequelize.STRING, allowNull: false},
      mail: {type:Sequelize.STRING, allowNull: false}  });
     
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
