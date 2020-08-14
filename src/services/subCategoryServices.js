import { db, subCategoryQuery } from "../db"
import { v4 as uuidv4 } from 'uuid';

class SubCategoryServices {

    static async createSubCategory(category_id, body) {
        const id = uuidv4();
        const { product_sub_category, description } = body;
        const type = product_sub_category.charAt(0).toUpperCase() + product_sub_category.slice(1);
        const payload = [id, category_id, type, description]

        return db.oneOrNone(subCategoryQuery.createSubCategory, payload);
    }

    static async getAllSubCategory() {
        return db.any(subCategoryQuery.getAllSubCategory);
    }

    static async checkIfSubCategoryExist(product_sub_category) {
        const type = product_sub_category.charAt(0).toUpperCase() + product_sub_category.slice(1);
        return db.oneOrNone(subCategoryQuery.getSubCategoryByProductSubCategory, [type])
    }

    static async checkIfCategoryIdExist(category_id) {
        return db.manyOrNone(subCategoryQuery.getSubCategoryByCategoryId, [category_id])
    }

    static async checkIfSubCategoryIdExist(id) {
        return db.manyOrNone(subCategoryQuery.getSubCategoryById, [id])
    }

    static async deleteSubCategory(id) {
        return db.oneOrNone(subCategoryQuery.deleteSubCategory, [id])
    }

    static async updateSubCategory(id, body) {
        const oldData = await this.checkIfSubCategoryIdExist(id);
        const newData = { ...oldData, ...body };
        const payload = [newData.product_sub_category, newData.description, id];

        return db.manyOrNone(subCategoryQuery.updateSubCategory, payload);
    }
}

export default SubCategoryServices;