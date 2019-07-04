const express = require('express')
const Router = express.Router()
const Home = require('../controllers/home')

Router.get("/",Home.getRegister)
Router.get("/login",Home.getLogin)
Router.get("/verifikasi/:studentId",Home.verifikasi)

module.exports = Router

