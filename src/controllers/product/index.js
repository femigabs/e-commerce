import { ProductServices, UploadServices } from '../../services';
import { Response } from '../../utils';
import { client } from '../../config'


class ProductController {

    static async createProduct(req, res) {
        const { product_sub_category } = req.params;
        try {
            const file = req.file;
            const image = await UploadServices.uploadImage(file);
            req.body.product_image = image.Location;
            const newProduct = await ProductServices.createProduct(product_sub_category, req.body);
            return newProduct
                ? Response.created(res, newProduct, "Product created successfully.")
                : Response.badrequestError(res, "Error creating Product.")
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async getAllProduct(req, res) {
        try {
            const allProduct = await ProductServices.getAllProduct();
            if (allProduct) {
                client.setex('allProduct', 300, JSON.stringify(allProduct));  /*  expires in five minute*/
                client.get('allProduct', async (error, data) => {
                    if (data) {
                        return Response.ok(res, JSON.parse(data), "All Product fetched successfully.");
                    }
                    return Response.badrequestError(res, "Error fetching Product.");
                })
            }
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

    static async getProductBySubCategory(req, res) {
        const { product_sub_category } = req.params;
        try {
            const product = await ProductServices.checkIfSubCategoryExist(product_sub_category);
            if (product) {
                client.setex(product_sub_category, 300, JSON.stringify(product));  /*  expires in five minute*/
                client.get(product_sub_category, async (error, data) => {
                    if (data) {
                        return Response.ok(res, JSON.parse(data), "Product fetched successfully.");
                    }
                    return Response.badrequestError(res, "Error fetching Product.");
                })
            }
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await ProductServices.checkIfProductIdExist(id);
            if (product) {
                client.setex(id, 300, JSON.stringify(product));  /*  expires in five minute*/
                client.get(id, async (error, data) => {
                    if (data) {
                        return Response.ok(res, JSON.parse(data), "Product fetched successfully.");
                    }
                    return Response.badrequestError(res, "Error fetching Product.");
                })
            }
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