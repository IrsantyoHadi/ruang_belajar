const express = require('express')
const app = express()
const flash = require('connect-flash-plus');
const session = require('express-session')
const routerStudent = require('./routes/student')
const routerHome = require('./routes/home')
const routerSubject = require('./routes/subject')
const port = 3000

app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000000000 }
}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routerHome)
app.use('/students', routerStudent)
app.use('/subjects', routerSubject)

app.listen(port, () => console.log(`Server running in port : ${port}!`))