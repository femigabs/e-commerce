import { db, productQuery } from "../db"
import { v4 as uuidv4 } from 'uuid';

class ProductServices {

    static async createProduct(sub_category_id, body) {
        const id = uuidv4();
        const { product_name, description, quantity, price, product_image } = body;
        const name = product_name.charAt(0).toUpperCase() + product_name.slice(1);
        const payload = [id, sub_category_id, name, description, quantity, price, product_image ];

        return db.oneOrNone(productQuery.createProduct, payload);
    }

    static async checkIfProductExist(product_name) {
        const name = product_name.charAt(0).toUpperCase() + product_name.slice(1);
        return db.oneOrNone(productQuery.getProductByName, [name])
    }

    static async searchProduct(body) {
        const { product_name } = body;
        const name = product_name.charAt(0).toUpperCase() + product_name.slice(1);
        const product = `${name}%`
        return db.manyOrNone(productQuery.getProductByName, [product])
    }

    static async checkIfProductIdExist(id) {
        return db.manyOrNone(productQuery.getProductById, [id])
    }

    static async getAllProduct() {
        return db.any(productQuery.getAllProduct);
    }

    static async checkIfSubCategoryIdExist(sub_category_id) {
        return db.manyOrNone(productQuery.getProductBySubCategoryId, [sub_category_id])
    }

    static async deleteProduct(id) {
        return db.oneOrNone(productQuery.deleteProduct, [id])
    }

    static async updateProduct(id, body) {
        const oldData = await this.checkIfProductIdExist(id);
        const newData = { ...oldData, ...body };
        const payload = [newData.product_name, newData.description, newData.quantity, newData.price, newData.product_image, id];
    
        return db.manyOrNone(productQuery.updateProduct, payload);
    }

    static async checkProductStatusAndQuantity(id) {
        return db.oneOrNone(productQuery.checkProductStatus, [id]);
    }

    static async updateProductStatusAndQuantity(quantity, status, id) {
        return db.oneOrNone(productQuery.updateProductStatusAndQuantity, [quantity, status, id]);
    }
}

export default ProductServices;