const Model = require('../models/index')

class StudentController {
  static postRegisterStudent(req,res){
    if(req.body.password != req.body.password_confirm){
      req.flash('msg', `password yang anda masukkan berbeda`)
      res.redirect('/')
    }else{
      let inputNewStudent ={
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        username : req.body.username,
        email : req.body.email,
        age : req.body.age,
        password: req.body.password,
        isRegister : false
      }
      Model.Student.create(inputNewStudent)
      .then(dataStudent=>{
        req.flash('msg', 'berhasil bikin ')
        res.redirect('/')
      })
      .catch(err=>{
        req.flash('msg', `${err.message}`)
        res.redirect('/')
      })
    }
  }
}

module.exports = StudentController