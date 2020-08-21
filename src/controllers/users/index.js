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

            return newUser
                ? Response.created(
                    res,
                    newUser,
                    "User created successfully."
                )
                : Response.badrequestError(
                    res,
                    "Error creating User."
                )
        } catch (error) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async resendVerificationCode(req, res) {
        try {
            const { id } = req.query;
            const user = await UserServices.updateVerificationCode(id);
            await MailMiddleware.resendVerificationCodeMail(user[0].email, user[0].verification_code, user[0].id, user[0].first_name, user[0].last_name)

            return user
                ? Response.ok(
                    res,
                    user,
                    'Verification code update successfully'
                )
                : Response.badrequestError(
                    res,
                    'Error Updating verification code.'
                );
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
                ? Response.ok(
                    res,
                    user,
                    'Verification successful'
                )
                : Response.badrequestError(
                    res,
                    'Error Verifying User.'
                );
        } catch (error) {
            return Response.serverError(res, 'Internal Server Error.');
        }
    }

    static async login(req, res) {
        try {
            if (req.password) {
                const token = Hash.generateToken(
                    req.user.first_name,
                    req.user.email
                );
                return Response.ok(
                    res,
                    token,
                    'User login successfully.'
                );
            }
            return Response.unauthorizedError(res, 'Invalid Password');
        } catch (e) {
            return Response.serverError(res, 'Internal Server Error.');
        }
    };

    static async forgetPassword(req, res) {
        try {
            const { email } = req.body;
            const profile = await UserServices.checkIfUserExist(email);
            const id = profile.id;
            const user = await UserServices.updateVerificationCode(id);
            await MailMiddleware.resetPasswordMail(user[0].email, user[0].verification_code, user[0].id);
            return user
                ? Response.ok(
                    res,
                    user,
                    'Reset link sent successfully.'
                )
                : Response.badrequestError(
                    res,
                    'Error Sending Reset link.'
                );

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
                ? Response.ok(
                    res,
                    user,
                    'Password reset successful'
                )
                : Response.badrequestError(
                    res,
                    'Error resetting User.'
                );

        } catch (error) {
            return Response.serverError(res, 'Internal Server Error.');
        }
    }

}

export default UserController;