import { db, orderDetailsQuery } from "../db"
import { v4 as uuidv4 } from 'uuid';

class OrderDetailsServices {

    static async createOrderDetails(user_id, body, is_default) {
        const id = uuidv4();
        const { first_name, last_name, address, state, city, phone_number } = body;
        const firstName = first_name.charAt(0).toUpperCase() + first_name.slice(1);
        const lastName = last_name.charAt(0).toUpperCase() + last_name.slice(1); 
        const payload = [id, user_id, firstName, lastName, address, state, city, phone_number, is_default];

        return db.oneOrNone(orderDetailsQuery.createOrderDetails, payload)
    }

    static async deleteOrderDetails(id) {
        return db.oneOrNone(orderDetailsQuery.deleteOrderDetails, [id])
    }

    static async checkIfOrderDetailsIdExist(id) {
        return db.oneOrNone(orderDetailsQuery.getOrderDetailsById, [id])
    }

    static async getOrderDetailsByUserId(user_id) {
        return db.manyOrNone(orderDetailsQuery.getOrderDetailsByUserId, [user_id]);
    }

    static async updateOrderDetails(id, body) {
        const oldData = await this.checkIfOrderDetailsIdExist(id);
        const newData = { ...oldData, ...body };
        const payload = [newData.first_name, newData.last_name, newData.address, newData.state, newData.city, newData.phone_number, id];

        return db.manyOrNone(orderDetailsQuery.updateOrderDetails, payload);
    }

    static async setDefaultAddress(id) {
        return db.oneOrNone(orderDetailsQuery.setDefaultAddress, [id]);
    }

    static async resetAddress(user_id) {
        return db.manyOrNone(orderDetailsQuery.resetAddress, [user_id]);
    }

}

export default OrderDetailsServices;