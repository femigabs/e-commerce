import { UserServices } from "../../services";
import { MailMiddleware } from "../../middleware";
import { Response, Hash } from '../../utils';

/**
 * @exports
 * @class UserController
 */
class UserController {
    static async signup(req, res) {
        try {
            const newUser = await UserServices.createUser(req.body);
            await MailMiddleware.sendVerificationMail(newUser.email, newUser.verification_code, newUser.id, newUser.first_name, newUser.last_name)
            const data = {
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                verification_code: newUser.verification_code,
                created_at: newUser.created_at
            }
            return newUser
                ? Response.created(res, data, "User created successfully.")
                : Response.badrequestError(res, "Error creating User.")
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async resendVerificationCode(req, res) {
        try {
            const { id } = req.query;
            const user = await UserServices.updateVerificationCode(id);
            await MailMiddleware.resendVerificationCodeMail(user[0].email, user[0].verification_code, user[0].id, user[0].first_name, user[0].last_name)

            return user
                ? Response.ok(res, {}, 'Verification code update successfully')
                : Response.badrequestError(res, 'Error Updating verification code.');
        } catch (error) {
            return Response.serverError(res, 'Internal Server Error.');
        }

    }

    static async updateVerificationStatus(req, res) {
        try {
            const { id } = req.query;
            const user = await UserServices.updateVerificationStatus(id);
            await MailMiddleware.sendVerificationSuccessfulMail(user[0].email, user[0].first_name, user[0].last_name);

            return user
                ? Response.ok(res, {}, 'Verification successful')
                : Response.badrequestError(res, 'Error Verifying User.');
        } catch (error) {
            return Response.serverError(res, 'Internal Server Error.');
        }
    }

    static async login(req, res) {
        try {
            const { email } = req.body;
            const user = await UserServices.checkIfUserExist(email)
            if (req.password) {
                const token = Hash.generateToken(
                    req.user.first_name,
                    req.user.email
                );
                const data = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    verification_code: user.verification_code,
                    token: token
                }
                return Response.ok(res, data, 'User login successfully.');
            }
            return Response.unauthorizedError(res, 'Invalid Password');
        } catch (error) {
            return Response.serverError(res, 'Internal Server Error.');
        }
    };

    static async forgetPassword(req, res) {
        try {
            const { email } = req.body;
            const profile = await UserServices.checkIfUserExist(email);
            const id = profile.id;
            const user = await UserServices.updateVerificationCode(id);
            const data = {
                verification_code: user[0].verification_code
            }
            await MailMiddleware.resetPasswordMail(user[0].email, user[0].verification_code, user[0].id);
            return user
                ? Response.ok(res, data, 'Reset link sent successfully.')
                : Response.badrequestError(res, 'Error Sending Reset link.');

        } catch (error) {
            return Response.serverError(res, 'Internal Server Error.');
        }
    }

    static async resetPassword(req, res) {
        try {
            const { id } = req.query;
            const profile = await UserServices.checkIfIdExist(id);
            const user = await UserServices.resetPassword(profile.id, profile.verification_code, req.body);
            await MailMiddleware.sendresetSuccessfulMail(user[0].email, user[0].first_name, user[0].last_name)

            return user
                ? Response.ok(res, {}, 'Password reset successful')
                : Response.badrequestError(res, 'Error resetting User.');

        } catch (error) {
            return Response.serverError(res, 'Internal Server Error.');
        }
    }

}

export default UserController;