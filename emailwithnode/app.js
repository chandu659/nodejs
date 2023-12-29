let nodemailer = require('nodemailer');
let dotenv = require('dotenv');
dotenv.config();

console.log(process.env.PASS)
let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'chandur659@gmail.com',
        pass:process.env.PASS
    }
})

let mailOption = {
    from:'chandur659@gmail.com',
    to:'chilkalarangachandramohan.reddy@slu.edu',
    subject:'Node mailer test mail',
    text:'This is about node mailer test'
}

transporter.sendMail(mailOption,(err,info)=>{
    if(err) console.log(err)
    else {
        console.log(`Email sent:${info.response}`)
    }
})