require('dotenv').config()
const nodemailer = require("nodemailer")

const user = process.env.email
const pass = process.env.pass

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `ruangbelajarhacktiv@gmail.com`,
    pass: `hacktiv8`
  }
});

let sendNotification = (data) => {
    return new Promise ((resolve,reject)=>{
        let mailOptions = {
            from: 'ruangbelajarhacktiv@gmail.com',
            to: data.dataValues.email,
            subject: 'Welcome to Ruang Belajar!!!',
            text: `Silahkan verifikasi menggunakan link dibawah ini:
            http://localhost:3000/verifikasi/${data.dataValues.id}`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log('error')
                reject(error);
            } else {
                resolve('Email sent: ' + info.response)
                console.log('Email sent: ' + info.response);
            }
        }) 
    })
}
module.exports = sendNotification