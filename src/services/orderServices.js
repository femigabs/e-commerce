import { db, orderQuery } from "../db"
import { v4 as uuidv4 } from 'uuid';

class OrderServices {

    static async createOrder(data, user_id) {
        const id = uuidv4();
        const order = data.map((cart) => db.oneOrNone(orderQuery.createOrder, [
            id,
            user_id,
            cart.cart_id,
            cart.product_id,
            cart.quantity,
            cart.price,
            cart.sub_total
        ]))
        return order
    }
}

export default OrderServices;