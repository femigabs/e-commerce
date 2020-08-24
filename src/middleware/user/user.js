import { Validate, Hash, Response } from "../../utils";
import { UserServices } from "../../services";
import moment from "moment";

class UserMiddleware {
    static async signupMiddleWare(req, res, next) {
        try {
            await Validate.schema.user.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                error: error.details[0].message.replace(
                    /[\]["]/gi,
                    ''
                ),
            });
        }
    }

    static async signupUser(req, res, next) {
        try {
            const { email } = req.body;

            const data = await UserServices.checkIfUserExist(email);

            if (data) {
                return Response.conflictError(
                    res,
                    "User already exist"
                )
            }
        } catch (error) {
            return Response.serverError(
                res,
                "Internal server error"
            )
        }
        next();
    }

    static async checkId(req, res, next) {
        const { id } = req.query
        const userId = await UserServices.checkIfIdExist(id);
        if (userId) {
            return next();
        }
        return Response.notFoundError(res, 'User Id not found');
    }

    static async checkCode(req, res, next) {
        const { verification_code } = req.body
        try {
            const data = await UserServices.checkIfCodeExist(verification_code);
            if (data) {
                const is_active = data.is_active;
                if (is_active) {
                    return Response.conflictError(
                        res,
                        "Account already verified"
                    )
                }
            } else {
                return Response.notFoundError(res, 'Verification code is invalid');
            }
        } catch (error) {
            return Response.serverError(
                res,
                "Internal server error"
            )
        }
        next();
    }

    static async checkExpiry(req, res, next) {
        const { verification_code } = req.body
        try {
            const data = await UserServices.checkIfCodeExist(verification_code);
            if (data) {
                const code_expiry = data.verification_code_expiry;
                if (moment().isAfter(code_expiry)) {
                    return Response.goneError(
                        res,
                        "Your verification code has expired, Please request a new one"
                    )
                }
            } else {
                return Response.notFoundError(res, 'Verification code is invalid');
            }
        } catch (error) {
            return Response.serverError(
                res,
                'Internal server error'
            )
        }
        next();
    }

    static async checkVerification(req, res, next) {
        const { email } = req.body
        const user = await UserServices.checkIfUserExist(email);
        const is_active = user.is_active;
        if (is_active) {
            return next();
        }
        return Response.notFoundError(res, 'Account is not verified, Please verify account');
    }

    static async loginMiddleWare(req, res, next) {
        try {
            await Validate.schema.login.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                error: error.details[0].message.replace(
                    /[\"]/gi,
                    ''
                ),
            });
        }
    };

    static async loginUser(req, res, next) {
        const { email } = req.body;
        const user = await UserServices.checkIfUserExist(email);
        if (user) {
            req.user = user;
            req.password = Hash.comparePassword(
                req.body.password,
                user.password
            )
            return next();
        }
        return Response.notFoundError(res, 'User does not exist');
    }

    static async userAuth(req, res) {
        const token = await Hash.generateToken(req.user.first_name, req.user.email);
        return Response.ok(
            res,
            token,
            'User login successfully.'
        );
    }

    static async verifyToken(req, res, next) {
        const { token } = req.headers;
        if (!token) {
            return Response.forbiddenError(
                res,
                'Token not provided'
            )
        }
        try {
            const decoded = Hash.decodeToken(token);
            req.user = {
                first_name: decoded.first_name,
                email: decoded.email
            }
            res.locals.user = req.user;
            next();

        } catch (e) {
            return Response.serverError(
                res,
                'Internal server error'
            )
        }
    }

    static async adminAuth(req, res, next) {
        const { email } = res.locals.user;
        try {
            const user = await UserServices.checkIfUserExist(email);
            const is_admin = user.is_admin
            if (is_admin) {
                return next();
            }
            return Response.forbiddenError(res, 'This User is not Authorized')
        } catch (e) {
            return Response.serverError(
                res,
                'Internal server error'
            )
        }
    }

    static async emailMiddleWare(req, res, next) {
        try {
            await Validate.schema.email.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                error: error.details[0].message.replace(
                    /[\"]/gi,
                    ''
                ),
            });
        }
    };

    static async checkResetCode(req, res, next) {
        const { verification_code } = req.body;
        try {
            const data = await UserServices.checkIfCodeExist(verification_code);
            if (data) {
                const is_active = data.is_active;
                if (is_active) {
                    return next();
                }
            } 
            return Response.notFoundError(res, 'Account is not verified, Please verify account');
        } catch (error) {
            return Response.serverError(
                res,
                "Internal server error"
            )
        }
    };



}

export default UserMiddleware;