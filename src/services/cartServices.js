import { db, cartQuery } from "../db";
import { Response } from "../utils";
import { v4 as uuidv4 } from 'uuid';

class CartServices {

    static async createCart(user_id) {
            const id = uuidv4();
            return db.oneOrNone(cartQuery.createCart, [id, user_id]);
    }

    static async createCartProduct(cart_id, product_id, price, sub_total) {
            const id = uuidv4();
            const payload = [id, cart_id, product_id, price, sub_total];
            return db.oneOrNone(cartQuery.createCartProduct, payload);
    }

    static async createCartProduc(data, user_id, product_id, price, sub_total) {
        db.tx(async t => {
            const cart_id = uuidv4();
            const id = uuidv4();
            const cart = await t.oneOrNone(cartQuery.createCart, [cart_id, user_id]);
            const payload = [id, cart_id, product_id, price, sub_total];
            const cart_product = await data.map(((items)=> t.oneOrNone(cartQuery.createCartProduct, payload)));

            return t.batch([cart, cart_product]);
        })
    }

    static async getCartByUserId(user_id) {
        return db.manyOrNone(cartQuery.getCartByUserId, [user_id]);
    }

    static async getCartProductByCartId(cart_id) {
        return db.manyOrNone(cartQuery.getCartProductByCartId, [cart_id]);
    }

    static async getCartProduct(cart_id) {
        return db.manyOrNone(cartQuery.getCartProduct, [cart_id]);
    }

    static async deleteCartProduct(id) {
        return db.oneOrNone(cartQuery.deleteCartProduct, [id])
    }

    static async deleteCart(id) {
        return db.oneOrNone(cartQuery.deleteCart, [id])
    }

    static async checkIfCartProductIdExist(id) {
        return db.oneOrNone(cartQuery.getCartProductById, [id])
    }

    static async checkIfProductIdExist(id) {
        return db.oneOrNone(cartQuery.getCartProductByProductId, [id])
    }

    static async updateCart(id, body) {
        const oldData = await this.checkIfCartProductIdExist(id);
        const newData = { ...oldData, ...body };
        const sub_total = newData.quantity * newData.price
        const payload = [newData.quantity, sub_total, id];

        return db.manyOrNone(cartQuery.updateCartProduct, payload);
    }

    static async sumSubTotal(cart_id) {
        return db.oneOrNone(cartQuery.sumSubTotal, [cart_id]);
    }
}

export default CartServices