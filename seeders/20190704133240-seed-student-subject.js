'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('StudentSubjects', [{
      StudentId: 1,
      SubjectId: 1,
      score: 0,
      isPaid: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      StudentId: 2,
      SubjectId: 2,
      score: 0,
      isPaid: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('StudentSubjects', null, {});
    */
    return queryInterface.bulkDelete('StudentSubjects', null, {});

  }
};