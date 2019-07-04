'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let qSubjectId = queryInterface.addConstraint('StudentSubjects', ['SubjectId'], { 
      type: 'foreign key',
      name: 'subject_id',
      references: {
        table: 'Subjects',
        field: 'id'
      },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  })
  let qStudentId = queryInterface.addConstraint('StudentSubjects', ['StudentId'], { 
    type: 'foreign key',
    name: 'student_id',
    references: {
      table: 'Students',
      field: 'id'
    },
  onDelete: 'cascade',
  onUpdate: 'cascade'
})
      return Promise.all([qStudentId,qSubjectId]) 
  },
  down: (queryInterface, Sequelize) => {
    let qSubjectId = queryInterface.removeConstraint('StudentSubjects', 'subject_id', {});
    let qStudentId =queryInterface.removeConstraint('StudentSubjects', 'student_id', {});
      return Promise.all([qStudentId,qSubjectId])
  }
};