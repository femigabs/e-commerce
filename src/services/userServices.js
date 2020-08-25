import { db, userQuery } from "../db"
import { v4 as uuidv4 } from 'uuid';
import { Hash } from '../utils';
import moment from "moment";


class UserServices {
    static async createUser(body) {
        const id = uuidv4();
        const { first_name, last_name, email, password, phone_number } = body;
        const email_address = email.toLowerCase();
        const firstName = first_name.charAt(0).toUpperCase() + first_name.slice(1);
        const lastName = last_name.charAt(0).toUpperCase() + last_name.slice(1);
        const hashedPassword = Hash.hashPassword(password);
        const { salt, hash } = hashedPassword;
        const verification_code_expiry = moment().add(10, 'minutes').format("YYYY-MM-DD HH:mm:ss");
        const verification_code = Math.floor(100000 + Math.random() * 900000);
        const payload = [id, firstName, lastName, email_address, phone_number, hash, salt, verification_code_expiry, verification_code];

        return db.oneOrNone(userQuery.createUser, payload);
    }

    static async checkIfUserExist(email) {
        return db.oneOrNone(userQuery.getUserByEmail, [email])
    }

    static async updateVerificationStatus(id, is_active = true) {
        const payload = [is_active, id]
        return db.manyOrNone(userQuery.updateVerificationStatus, payload)
    }

    static async checkIfIdExist(id) {
        return db.oneOrNone(userQuery.findUserById, [id]);
    }

    static async checkIfCodeExist(verification_code, id) {
        return db.oneOrNone(userQuery.findUserByCode, [verification_code, id]);
    }

    static async checkIfUserIsVerified(is_active = true) {
        return db.oneOrNone(userQuery.checkIfUserIsVerified, [is_active]);
    }

    static async updateVerificationCode(id,
        verification_code = Math.floor(100000 + Math.random() * 900000),
        verification_code_expiry = moment().add(10, 'minutes').format("YYYY-MM-DD HH:mm:ss")) {
        const payload = [verification_code, verification_code_expiry, id]
        return db.manyOrNone(userQuery.updateVerificationCode, payload)
    }

    static async resetPassword(id, verification_code, body) {
        const { password } = body;
        const hashedPassword = Hash.hashPassword(password);
        const { salt, hash } = hashedPassword;
        const payload = [verification_code, hash, salt, id]
        return db.manyOrNone(userQuery.resetPassword, payload)
    }
}

export default UserServices;