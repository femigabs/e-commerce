import { Validate, Response } from "../../utils";
import { ProductServices } from "../../services";
import e from "express";

class ProductMiddleware {

    static async createMiddleWare(req, res, next) {
        try {
            await Validate.schema.product.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                error: error.details[0].message.replace(
                    /[\"]/gi,
                    ''
                ),
            });
        }
    };

    static async product(req, res, next) {
        try {
            const { product_name } = req.body;

            const data = await ProductServices.checkIfProductExist(product_name);
            if (data) {
                return Response.conflictError(
                    res,
                    "Product already exist"
                )
            }
        } catch (e) {
            return Response.serverError(
                res,
                "Internal server error"
            )
        }
        next();
    }

    static async checkProductId(req, res, next) {
        const { id } = req.params;
        const productId = await ProductServices.checkIfProductIdExist(id);
        if (productId) {
            return next();
        }
        return Response.notFoundError(res, 'Product does not exist');
    }

    static async productMiddleWare(req, res, next) {
        try {
            await Validate.schema.productName.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                error: error.details[0].message.replace(
                    /[\"]/gi,
                    ''
                ),
            });
        }
    };

}

export default ProductMiddleware;