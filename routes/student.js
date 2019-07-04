const express = require('express')
const Router = express.Router()
const Student = require('../controllers/student')
const validasiLogin = require('../middleware/validasiLogin')

Router.get("/")
Router.post("/register",Student.postRegisterStudent)
Router.post("/login",Student.postLogin)
Router.get("/dashboard/:studentId",validasiLogin,Student.getDashBoard)
Router.get("/edit_profile/:studentId",Student.getEdit)
Router.get("/delete/:studentId",Student.delete)
Router.post("/edit_profile/:studentId",Student.postEdit)
Router.get("/logout",Student.logout)
module.exports = Router