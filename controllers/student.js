const Model = require('../models/index')
const bcrypt = require('bcryptjs');

class StudentController {
  static postRegisterStudent(req,res){
    if(req.body.password != req.body.password_confirm){
      req.flash('msg', `password yang anda masukkan berbeda`)
      res.redirect('/')
    }else{  
      let inputNewStudent ={
        first_name : (req.body.first_name == '' ? null:req.body.first_name),
        last_name : (req.body.last_name == '' ? null:req.body.last_name),
        username : (req.body.username == '' ?null:req.body.username),
        email : (req.body.email == ''?null:req.body.email),
        age : +req.body.age,
        password: (req.body.password=''?null:req.body.password),
        isRegister : false
      }
      Model.Student.create(inputNewStudent)
      .then(dataStudent=>{
        req.flash('login', 'berhasil membuat account, silahkan konfirmasi email anda sebelum login ')
        res.redirect('/login')
      })
      .catch(err=>{
        req.flash('msg',`${err.message}`)
        res.redirect('/')
      })
    }
  }
  static postLogin(req,res){
    Model.Student.findOne({
      where : {
        username : req.body.username
      }
    })
    .then(dataStudent=>{
      if(dataStudent){
        if(bcrypt.compareSync(req.body.password,dataStudent.password)){
          res.send(dataStudent)
        }else{
        req.flash('login','Password Salah')
        res.redirect('/login')
        }
      }else{
        req.flash('login','Data Username Tidak Ditemukan')
        res.redirect('/login')
      }
    })
  }
}

module.exports = StudentController