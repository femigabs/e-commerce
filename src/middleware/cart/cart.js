import { Validate, Response } from "../../utils";
import { CartServices } from "../../services";

class CartMiddleware {

    static async checkCartId(req, res, next) {
        const { id } = req.params;
        const productId = await CartServices.checkIfCartIdExist(id);
        if (productId) {
            return next();
        }
        return Response.notFoundError(res, 'Cart does not exist');
    }

    static async cart(req, res, next) {
        try {
            const { product_id } = req.params;

            const data = await CartServices.checkIfProductIdExist(product_id);
            if (data) {
                return Response.conflictError(
                    res,
                    "Product already exist in Cart"
                )
            }
        } catch (error) {
            return Response.serverError(
                res,
                "Internal server error"
            )
        }
        next();
    }
}

export default CartMiddleware;