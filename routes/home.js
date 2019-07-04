const express = require('express')
const Router = express.Router()
const Home = require('../controllers/home')

Router.get("/",Home.getRegister)
Router.get('/test',(req,res)=>{
res.render('test.ejs',{
  title : 'ASIIIIk'
})
})

module.exports = Router

