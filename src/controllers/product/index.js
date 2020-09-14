import { ProductServices, UploadServices } from '../../services';
import { Response } from '../../utils';
import { client } from '../../config'


class ProductController {

    static async createProduct(req, res) {
        const { sub_category_id } = req.params;
        try {
            const file = req.file;
            const image = await UploadServices.uploadImage(file);
            req.body.product_image = image.Location;
            const newProduct = await ProductServices.createProduct(sub_category_id, req.body);
            return newProduct
                ? Response.created(res, newProduct, "Product created successfully.")
                : Response.badrequestError(res, "Error creating Product.")
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async getAllProduct(req, res) {
        try {
            client.get('allProduct', async (error, data) => {
                if (data) {
                    return Response.ok(res, JSON.parse(data), "All Product fetched successfully.");
                }
                const allProduct = await ProductServices.getAllProduct();
                if (allProduct) {
                    client.setex('allProduct', 300, JSON.stringify(allProduct));  /*  expires in five minute*/
                }
                return Response.badrequestError(res, "Error fetching Product.");
            })
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async searchProduct(req, res) {
        try {
            const product = await ProductServices.searchProduct(req.body);
            if (product.length > 0) {
                return Response.ok(res, product, "Product fetched successfully.")
            } else if (product.length === 0) {
                return Response.badrequestError(res, "No such product")
            }
        } catch (error) {
            return Response.serverError(res, "Internal Server Error."
            )
        }
    }

    static async getProductBySubCategoryId(req, res) {
        const { sub_category_id } = req.params;
        try {
            client.get(sub_category_id, async (error, data) => {
                if (data) {
                    return Response.ok(res, JSON.parse(data), "Product fetched successfully.");
                }
                const product = await ProductServices.checkIfSubCategoryIdExist(sub_category_id);
                if (product) {
                    client.setex(sub_category_id, 300, JSON.stringify(product));  /*  expires in five minute*/
                }
                return Response.badrequestError(res, "Error fetching Product.");
            })
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductServices.deleteProduct(id);

            return product
                ? Response.ok(res, null, 'Product deleted successfully')
                : Response.badrequestError(res, 'Error deleting Product')
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const file = req.file;
            const image = await UploadServices.uploadImage(file);
            req.body.product_image = image.Location;
            const product = await ProductServices.updateProduct(id, req.body);

            return product
                ? Response.ok(res, null, 'Product updated successfully')
                : Response.badrequestError(res, 'Error updating Product')
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }
}

export default ProductController;