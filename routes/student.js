const express = require('express')
const Router = express.Router()
const Student = require('../controllers/student')

Router.get("/")
Router.post("/register",Student.postRegisterStudent)
Router.post("/login",Student.postLogin)

module.exports = Router