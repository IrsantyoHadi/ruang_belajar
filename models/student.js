'use strict';
module.exports = (sequelize, DataTypes) => {
  class Student extends sequelize.Sequelize.Model {
    static associate(models){
      Student.belongsToMany(models.Subject,{through : models.StudentSubject})
    }
  }
  Student.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    password: DataTypes.STRING,
    isRegister: DataTypes.BOOLEAN
  },{ 
    hooks :{
      afterCreate : (input) =>{
        const bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(input.password, salt)
        return input.update({password : hash })
      }
    },
    sequelize })
  return Student;
};