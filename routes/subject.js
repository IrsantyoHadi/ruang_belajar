const express = require('express')
const Router = express.Router()
const SubjectController = require('../controllers/subject')

// Router.get("/", (req, res) => {
//     res.render('home.ejs')
// })


Router.get('/', SubjectController.getAll)
Router.get('/:SubjectId/:StudentId', SubjectController.getSubject)
Router.get('/:SubjectId', SubjectController.getQuiz)
Router.post('/:SubjectId', SubjectController.updateQuiz)


module.exports = Router