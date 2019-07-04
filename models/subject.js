'use strict';
module.exports = (sequelize, DataTypes) => {
  class Subject extends sequelize.Sequelize.Model {
    static associate(models) {
      Subject.belongsToMany(models.Student, {
        through: models.StudentSubject
      })
    }
  }
  Subject.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    diffilcutyLevel: DataTypes.INTEGER
  }, {
    sequelize
  })

  return Subject;
};