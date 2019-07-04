const Model = require('../models/index')

class SubjectController {
    static getAll(req, res) {
        Model.Subject.findAll()
            .then(subjects => {
                res.render('all_subjects.ejs', {
                    subjects,
                    StudentId: 1,
                    title: 'Halaman Subjects',
                })
            })
            .catch(err => {
                res.send(err)
            })

    }

    static getSubject(req, res) {
        Model.StudentSubject.findOne({
                where: {
                    StudentId: req.params.StudentId,
                    SubjectId: req.params.SubjectId

                }
            })
            .then(subject => {
                // res.send('masuk view-subject')
                res.render('view-subject.ejs', {
                    subject: subject.dataValues,
                    title: 'Halaman Report'
                })
            })
            .catch(err => {
                // console.log(err.message);

                res.send(err)
            })
    }

    static getQuiz(req, res) {
        Model.Subject.findByPk(req.params.SubjectId)
            .then(subject => {
                // res.send('masuk view-subject')
                // console.log(subject);
                if (subject.dataValues.name == 'Matematika') {
                    res.render('quiz.ejs', {
                        subject: subject.dataValues,
                        title: 'Halaman Quiz'
                    })

                }
                if (subject.dataValues.name == 'Fisika') {
                    res.render('quiz.1.ejs', {
                        subject: subject.dataValues,
                        title: 'Halaman Quiz'
                    })
                }
                if (subject.dataValues.name == 'Kimia') {
                    res.render('quiz.2.ejs', {
                        subject: subject.dataValues,
                        title: 'Halaman Quiz'
                    })
                }
            })
            .catch(err => {
                // console.log(err.message);

                res.send(err)
            })
    }

    static updateQuiz(req, res) {
        let options = req.body
        let score = 0
        // console.log(options['question-1-answers']);
        if (options['question-1-answers'] == 'A') {
            score++
        }
        if (options['question-2-answers'] == 'A') {
            score++
        }
        if (options['question-3-answers'] == 'B') {
            score++
        }
        if (options['question-4-answers'] == 'A') {
            score++
        }
        if (options['question-5-answers'] == 'A') {
            score++
        }

        // console.log(score);


        Model.StudentSubject.findOne({
                where: {
                    StudentId: req.params.StudentId,
                    SubjectId: req.params.SubjectId

                }
            })
            .then(subject => {

                return subject.update({
                    "score": score * 10
                })


            })
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                // console.log(err.message);

                res.send(err)
            })


    }
}
module.exports = SubjectController