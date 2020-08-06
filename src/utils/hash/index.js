import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const key = process.env.SECRET;

/**
 * @exports
 * @class Helpers
 */
class Helpers {
    /**
     * hashPassword
     * @static method
     * @param {string} password - Request object
     * @return {object}
     */
    static hashPassword(password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        if (hash && salt) {
            return { hash, salt };
        }
        return false;
    }

    /**
     * comparePassword
     * @static method
     * @param {string} password - Request object
     * @param {string} hash - Request object
     * @return {object}
     */
    static comparePassword(password, hash) {
        const validPassword = bcrypt.compareSync(password, hash);
        if (validPassword) {
            return true;
        }
        return false;
    }

    /**
     * comparePassword
     * @static method
     * @param {string} first_name - Request object
     * @param {string} email - Request object
     * @return {object}
     */
    static generateToken(first_name, email) {
        return jwt.sign({ first_name, email }, key, { expiresIn: '1h' });
    }

    /**
     * comparePassword
     * @static method
     * @param {string} token - Request object
     * @return {object}
     */
    static decodeToken(token) {
        try {
            return jwt.verify(token, key);
        } catch (e) {
            return error;
        }
    }

}
export default Helpers;