const Model = require('../models/index')

class HomeController {

  static getRegister(req,res){
    res.render('home.ejs',{
      title : "Ruang Belajar",
      msg : req.flash('msg')
    })
  }

}

module.exports = HomeController