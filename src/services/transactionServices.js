import { db, transactionQuery } from "../db"
import { v4 as uuidv4 } from 'uuid';

class TransactionServices {

    static async createTransaction(order_id,  body) {
        const payload = [
            body.id,
            body.order_id,
            body.reference,
            body.amount,
            body.status,
            body.currency,
        ];

        return db.oneOrNone(transactionQuery.createTransaction, payload)
    }

    static async verifyTransaction(status, reference) {
        return db.oneOrNone(transactionQuery.verifyTransaction, [status, reference])
    }
}

export default TransactionServices;