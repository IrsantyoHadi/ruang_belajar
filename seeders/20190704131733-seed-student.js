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
    return queryInterface.bulkInsert('Students', [{
      first_name: 'Jecko',
      last_name: 'Bardun',
      username: 'Jecko',
      email: 'bardun@gmail.com',
      age: 22,
      password: 13,
      isRegister: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Boka',
      last_name: 'Sudan',
      username: 'Boka',
      email: 'sudan@gmail.com',
      age: 22,
      password: 13,
      isRegister: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Students', null, {});
    */
    return queryInterface.bulkDelete('Students', null, {});

  }
};