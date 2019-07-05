const Model = require('../models/index')

class SubjectController {
    static getAll(req, res) {
        Model.Subject.findAll()
            .then(subjects => {
                res.render('all_subjects.ejs', {
                    subjects,
                    StudentId: req.session.Student.id,
                    title: 'Halaman Subjects',
                    msg : req.flash('msgAll'),
                    id : req.session.Student.id
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getSubject(req, res) {
      let toInput = {
        StudentId : req.params.StudentId,
        SubjectId : req.params.SubjectId,
        score : 0,
        isPaid : false
      }
      Model.StudentSubject.create(toInput)
      .then(()=>{
        req.flash('msgAll','Berhasil mengikuti Pelajaran')
        res.redirect('/subjects')
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
                        title: 'Halaman Quiz',
                        StudentId: req.session.Student.id
                    })

                }
                if (subject.dataValues.name == 'Fisika') {
                    res.render('quiz.1.ejs', {
                        subject: subject.dataValues,
                        title: 'Halaman Quiz',
                        StudentId: req.session.Student.id
                    })
                }
                if (subject.dataValues.name == 'Kimia') {
                    res.render('quiz.2.ejs', {
                        subject: subject.dataValues,
                        title: 'Halaman Quiz',
                        StudentId: req.session.Student.id
                    })
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static updateQuiz(req, res) {
        let options = req.body
        let nilai = 0
        // console.log(options['question-1-answers']);
        if (options['question-1-answers'] == 'A') {
            nilai++
        }
        if (options['question-2-answers'] == 'A') {
            nilai++
        }
        if (options['question-3-answers'] == 'B') {
            nilai++
        }
        if (options['question-4-answers'] == 'A') {
            nilai++
        }
        if (options['question-5-answers'] == 'A') {
            nilai++
        }

        Model.StudentSubject.findOne({
                where: {
                    StudentId: req.params.StudentId,
                    SubjectId: req.params.SubjectId
                }
            })
            .then(subject => {
              subject.update({
                    score: nilai * 10
                })
                req.flash('msgAll',`selamat nilai kamu ${nilai * 10}`)
                res.redirect('/subjects')
            })
            .catch(err => {
                res.send(err)
            })


    }
}
module.exports = SubjectController