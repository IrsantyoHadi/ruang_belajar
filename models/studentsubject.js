'use strict';
module.exports = (sequelize, DataTypes) => {
  class StudentSubject extends sequelize.Sequelize.Model{
    static associate(models){
      StudentSubject.hasMany(models.Student)
      StudentSubject.hasMany(models.Subject)
    }
  }
  StudentSubject.init({
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    isPaid: DataTypes.BOOLEAN
  },{sequelize})

  return StudentSubject;
};