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
        username : req.body.username,
        email : req.body.email,
        age : +req.body.age,
        password: req.body.password,
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
        if(req.body.password == req.body.password_confirm){
          if(bcrypt.compareSync(req.body.password,dataStudent.password)){
            if(dataStudent.isRegister){
              req.session.Student = {
                id : dataStudent.id,
                username : req.body.username
              }
              // console.log(req.session.Student)
              res.redirect(`/students/dashboard/${dataStudent.id}`)
            }else{
              throw new Error(`Silahkan verifikasi email terlebih dahulu`)
            }
          }else{
            throw new Error(`Password Salah`)
          }
        }else{
          throw new Error(`Password yang anda masukkan berbeda`)  
        }
      }else{
        throw new Error(`Data Username Tidak Ditemukan`)
      }
    })
    .catch(err=>{
      req.flash('login',`${err.message}`)
      res.redirect('/login')
    })
  }

  static logout(req,res){
    req.session.destroy()
    res.redirect('/')
  }

  static delete(req,res){
    Model.Student.destroy({
      where : {
        id : req.params.studentId
      }
    })
    .then(()=>{
      req.flash('msg','Selamat Jalan Sampai Jumpa Lagi')
      res.redirect('/')
    })
  }

  static getDashBoard(req,res){
    Model.Student.findByPk(req.params.studentId)
    .then(dataStudent=>{
      res.render('student_dashboard.ejs',{
        title : ` Hi ${dataStudent.first_name}!!`,
        dataStudent,
        msg : req.flash('dashboard')
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static getEdit(req,res){
    Model.Student.findByPk(req.params.studentId)
    .then(dataStudent=>{
      res.render('edit_student.ejs',{
        title : 'Edit Profile',
        dataStudent,
        msg : req.flash('edit')
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static postEdit(req,res){
    // res.send(req.body)
    if(req.body.password == req.body.password_confirm){
      Model.Student.findByPk(req.params.studentId)
      .then(dataStudent=>{
       return dataStudent.update(
          {
            username :req.body.username,
            email : req.body.email,
            password : req.body.password
          }
          )
      })
      .then(()=>{
        req.flash('dashboard',`berhasil edit profile`)
        res.redirect(`/students/dashboard/${req.params.studentId}`)
      })
      .catch(err=>{
        req.flash('edit',`${err}`)
        res.redirect(`/students/edit_profile/${req.params.studentId}`)
      })
    }else{
      req.flash('edit','salah konfirmasi password')
      res.redirect(`/students/edit_profile/${req.params.studentId}`)
    }
  }

  static getAll(req,res){
    Model.Student.findAll({
      include : [Model.Subject],
      order : [['id','ASC']]
    })
    .then(dataStudents=>{
      res.render('all_students.ejs',{
        title: 'Students',
        dataStudents,
        id:req.session.Student.id
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static reportCard(req,res){
    Model.StudentSubject.findAll({
      where :{
        StudentId : req.params.studentId
      },
      include : [Model.Student,Model.Subject]
    })
    .then(data=>{
      // res.send(data)
      res.render('student_reportcard.ejs',{
        data,
        title : data[0].Student.first_name,
        id : req.session.Student.id
      })
    })
    .catch(err=>{
      req.flash('login','silahkan login terlebih dahulu')
      res.redirect('/login')
    })
  }
}

module.exports = StudentController