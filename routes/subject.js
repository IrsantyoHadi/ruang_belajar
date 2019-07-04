const express = require('express')
const Router = express.Router()
const SubjectController = require('../controllers/subject')


Router.get('/', SubjectController.getAll)
Router.get('/:SubjectId/:StudentId', SubjectController.getSubject)
Router.get('/:SubjectId/:StudentId/quiz', SubjectController.getQuiz)
Router.post('/score/:SubjectId/:StudentId', SubjectController.updateQuiz)


module.exports = Router