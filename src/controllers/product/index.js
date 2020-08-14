import { ProductServices, UploadServices } from '../../services';
import { Response } from '../../utils';


class ProductController {

    static async createProduct(req, res) {
        const { sub_category_id } = req.params;
        try {
            const file = req.file;
            const image = await UploadServices.uploadImage(file);
            req.body.product_image = image.Location;
            const newProduct = await ProductServices.createProduct(sub_category_id, req.body);
            return newProduct
                ? Response.created(
                    res,
                    newProduct,
                    "Product created successfully."
                )
                : Response.badrequestError(
                    res,
                    "Error creating Product."
                )
        } catch (e) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async getAllProduct(req, res) {
        try {
            const allProduct = await ProductServices.getAllProduct();
            return allProduct
                ? Response.ok(
                    res,
                    allProduct,
                    "All Product fetched successfully."
                )
                : Response.badrequestError(
                    res,
                    "Error fetching Product."
                )
        } catch (e) {
            console.log(e);
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async searchProduct(req, res) {
        try {
            const product = await ProductServices.searchProduct(req.body);
            return product
                ? Response.ok(
                    res,
                    product,
                    "Product fetched successfully."
                )
                : Response.badrequestError(
                    res,
                    "Error fetching Product."
                )
        } catch (error) {
            console.log("ProductController -> searchProduct -> error", error)
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async getProductBySubCategoryId(req, res) {
        const { sub_category_id } = req.params;
        try {
            const product = await ProductServices.checkIfSubCategoryIdExist(sub_category_id);
            return product
                ? Response.ok(
                    res,
                    product,
                    "Product fetched successfully."
                )
                : Response.badrequestError(
                    res,
                    "Error fetching Product."
                )
        } catch (e) {
            console.log(e);
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductServices.deleteProduct(id);

            return product
                ? Response.ok(
                    res,
                    product,
                    'Product deleted successfully'
                )
                : Response.badrequestError(
                    res,
                    'Error deleting Product'
                )
        } catch (e) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
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
                ? Response.ok(
                    res,
                    product,
                    'Product updated successfully'
                )
                : Response.badrequestError(
                    res,
                    'Error updating Product'
                )
        } catch (error) {
            console.log("ProductController -> updateProduct -> error", error)
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }
}

export default ProductController;