module.exports = (req,res,next)=>{
  if(req.session.Student){
    if(req.session.Student.id == req.params.studentId){
      next()
    }else{
      req.flash('login','WrongId')
      res.redirect('/login')
    }
  }else{
    req.flash('login','Anda harus login dulu')
    res.redirect('/login')
  }
}