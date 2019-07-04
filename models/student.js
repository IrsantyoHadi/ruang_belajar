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
    username: {
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty : {
          args : true,
          msg : `username tidak boleh kosong`
        }
      },
      unique : {
        args :true,
        msg: `username sudah digunakan`
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull:false,
      validate :{
        isEmail : {
          args : true,
          msg : `format email salah`
        },
        notEmpty : {
          args : true,
          msg : `username tidak boleh kosong`
        }
      },
      unique : {
        args : true,
        msg: 'email ini sudah digunakan'
      }
    },
    age: {
      type : DataTypes.INTEGER,
      validate :{
        min : {
          args : 10,
          msg : 'umur minimal untuk mendaftar aplikasi adalah 10 tahun'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate: {
        isLength4(input){
          if(input.length<4){
            throw new Error(`password minimal 4 huruf`)
          }
        }
      }
    },
    isRegister: DataTypes.BOOLEAN
  },{ 
    hooks :{
      beforeSave : (input) =>{
        const bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(input.password, salt)
        input.password = hash
      }
    },
    sequelize })
  return Student;
};