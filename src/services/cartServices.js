import { db, cartQuery } from "../db"
import { v4 as uuidv4 } from 'uuid';

class CartServices {

    static async createCart(user_id, product_id, price, sub_total) {
        const id = uuidv4();
        const payload = [id, user_id, product_id, price, sub_total];

        return db.oneOrNone(cartQuery.createCart, payload)
    }

    static async getCartByUserId(user_id) {
        return db.manyOrNone(cartQuery.getCartByUserId, [user_id]);
    }

    static async deleteCart(id) {
        return db.oneOrNone(cartQuery.deleteCart, [id])
    }

    static async checkIfCartIdExist(id) {
        return db.oneOrNone(cartQuery.getCartById, [id])
    }

    static async checkIfProductIdExist(id) {
        return db.oneOrNone(cartQuery.getCartByProductId, [id])
    }

    static async updateCart(id, body) {
        const oldData = await this.checkIfCartIdExist(id);
        const newData = { ...oldData, ...body };
        const sub_total = newData.quantity * newData.price
        const payload = [newData.quantity, sub_total, id];

        return db.manyOrNone(cartQuery.updateCart, payload);
    }
}

export default CartServices