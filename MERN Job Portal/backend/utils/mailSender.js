const nodemailer = require("nodemailer");
require("dotenv").config()

const mailSender = async(email,title,body)=>{
try {
    let transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMPT_PORT,
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORED,
        },
    })

    let info = await transporter.sendMail({
        from: 'E-Commerce - by Rohit Dhillon',
        to:`${email}`,
        subject: `${title}`,
        html: `${body}`,
    })
    console.log("imfo",info);
    return info;
    
} catch (error) {
    console.log(error)
}
}
module.exports = mailSender