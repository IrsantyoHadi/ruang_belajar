const Model = require('../models/index')

class HomeController {

  static getRegister(req,res){
    res.render('home.ejs',{
      title : "Ruang Belajar",
      msg : req.flash('msg')
    })
  }

  static getLogin(req,res){
    res.render('home_login.ejs',{
      title : "Login",
      msg : req.flash('login')
    })
  }

  static verifikasi(req,res){
    Model.Student.findByPk(req.params.studentId)
    .then(dataStudent=>{
      dataStudent.update({isRegister : true})
      req.flash('login',`Selamat Datang di Ruang Belajar ${dataStudent.first_name} silahkan login untuk mulai belajar`)
      res.redirect('/login')
    })
    .catch(err=>{
      res.send(err)
    })
  }
  
}

module.exports = HomeController