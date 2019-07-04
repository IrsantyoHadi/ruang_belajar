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
  
}

module.exports = HomeController