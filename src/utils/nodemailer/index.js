import nodemailer from "nodemailer";
import config from '../../config'


const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.SMTP_HOST_FROM,
        pass: config.SMTP_HOST_PASSWORD
    }
});

transport.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

export default transport;