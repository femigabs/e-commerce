import { db, categoryQuery } from "../db"
import { v4 as uuidv4 } from 'uuid';
import { Hash } from '../utils';

class CategoryServices {

    static async createCategory(body) {
        const id = uuidv4();
        const { product_type, description } = body;
        const type = product_type.charAt(0).toUpperCase() + product_type.slice(1);
        const payload = [id, type, description]

        return db.oneOrNone(categoryQuery.createCategory, payload)
    }

    static async checkIfCategoryExist(product_type) {
        const type = product_type.charAt(0).toUpperCase() + product_type.slice(1);
        return db.oneOrNone(categoryQuery.getCategoryByProductType, [type])
    }

    static async checkIfIdExist(id) {
        return db.oneOrNone(categoryQuery.getCategoryById, [id])
    }

    static async getAllCategory() {
        return db.any(categoryQuery.getAllCategory);
    }

    static async updateCategory(id, body) {
        const oldData = await this.checkIfIdExist(id);
        const newData = { ...oldData, ...body };
        const payload = [newData.product_type, newData.description, id];

        return db.manyOrNone(categoryQuery.updateCategory, payload);
    }

    static async deleteCategory(id) {
        return db.oneOrNone(categoryQuery.deleteCategory, [id])
    }


}

export default CategoryServices;