'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let qUniqueEmail = queryInterface.addConstraint('Students', ['email'], {
      type: 'unique',
      name: 'uniqueEmail'
    });
    let qUniqueUsername = queryInterface.addConstraint('Students', ['username'], {
      type: 'unique',
      name: 'uniqueUsername'
    });
      return Promise.all([qUniqueEmail,qUniqueUsername]) 
  },
  down: (queryInterface, Sequelize) => {
    let qUniqueEmail = queryInterface.removeConstraint('StudentSubjects', 'uniqueEmail', {});
    let qUniqueUsername =queryInterface.removeConstraint('StudentSubjects', 'uniqueUsername', {});
      return Promise.all([qUniqueEmail,qUniqueUsername])
  }
};