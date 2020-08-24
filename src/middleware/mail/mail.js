import config from '../../config'
import { Response, templates, transport } from "../../utils";

class MailMiddleware {
    static async sendVerificationMail(email, verification_code, id, first_name, last_name) {
        const data = {
            from: config.SMTP_HOST_FROM,
            to: email,
            subject: "Verification Code",
            html: templates.sendVerificationTemplate(email, verification_code, id, first_name, last_name)
        };

        try {
            const response = await this.sendMailTemplate(data)
            console.log(response);
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async sendVerificationSuccessfulMail(email, first_name, last_name) {
        const data = {
            from: config.SMTP_HOST_FROM,
            to: email,
            subject: "Email confirmation successful",
            html: templates.verificationSuccessfulTemplate(email, first_name, last_name)
        };

        try {
            const response = await this.sendMailTemplate(data)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async resendVerificationCodeMail(email, verification_code, id, first_name, last_name) {
        const data = {
            to: email,
            from: config.SMTP_HOST_FROM,
            subject: "Email Update",
            html: templates.resendVerificationTemplate(email, verification_code, id, first_name, last_name)
        };

        try {
            const response = await this.sendMailTemplate(data)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async resetPasswordMail(email, verification_code, id) {
        const data = {
            from: config.SMTP_HOST_FROM,
            to: email,
            subject: "Reset Password",
            html: templates.resetPasswordTemplate(email, verification_code, id)
        };

        try {
            const response = await this.sendMailTemplate(data)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async sendresetSuccessfulMail(email, first_name, last_name) {
        const data = {
            from: config.SMTP_HOST_FROM,
            to: email,
            subject: "Password reset successful",
            html: templates.resetSuccessfulTemplate(email, first_name, last_name)
        };

        try {
            const response = await this.sendMailTemplate(data)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async sendMailTemplate(data) {
        if (process.env.NODE_ENV != "test") {
            return new Promise((resolve, reject) => {
                transport.sendMail(data, (err, info) => {
                    if (err) {
                        reject(
                            Response.transactionError(
                                "There was an error sending mail"
                            )
                        );
                    } else {
                        resolve("Mail Sent Successfully");
                    }
                });
            })
        }
    }
}

export default MailMiddleware;