import { db, transactionQuery } from "../db"
import { v4 as uuidv4 } from 'uuid';

class TransactionServices {

    static async createTransaction(user_id, body) {
        const id = uuidv4();
        const payment_id = body.id
        const payload = [
            id,
            user_id,
            cart_id,
            payment_id,
            body.reference,
            body.amount,
            body.status,
            body.currency
        ];
        return db.oneOrNone(transactionQuery.createTransaction, payload)
    }

    static async verifyTransaction(status, reference) {
        return db.oneOrNone(transactionQuery.verifyTransaction, [status, reference])
    }

    static async checkIfCategoryIdExist(reference) {
        return db.oneOrNone(transactionQuery.getTransactionByReference, [reference])
    }
}

export default TransactionServices;