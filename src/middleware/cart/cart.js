import { Validate, Response } from "../../utils";
import { CartServices, ProductServices, UserServices } from "../../services";

class CartMiddleware {

    static async checkCartProductId(req, res, next) {
        const { id } = req.params;
        const productId = await CartServices.checkIfCartProductIdExist(id);
        if (productId) {
            return next();
        }
        return Response.notFoundError(res, 'Cart does not exist');
    }

    static async checkCart(req, res, next) {
        const { email } = res.locals.user;
        const user = await UserServices.checkIfUserExist(email);
        const user_id = user.id;
        const cart = await CartServices.getCartByUserId(user_id)
        if (cart) {
            return next();
        }
        return Response.notFoundError(res, 'Cart does not exist');
    }

    static async checkCartProduct(req, res, next) {
        const { email } = res.locals.user;
        const user = await UserServices.checkIfUserExist(email);
        const user_id = user.id;
        const cart = await CartServices.getCartByUserId(user_id);
        const cartProduct = await CartServices.getCartProductByCartId(cart.id)
        if (cartProduct) {
            return next();
        }
        return Response.notFoundError(res, 'Cart is empty');
    }

    static async cart(req, res, next) {
        try {
            const { email } = res.locals.user;
            const user = await UserServices.checkIfUserExist(email);
            const user_id = user.id;
            const cart = await CartServices.getCartByUserId(user_id);
            const { product_id } = req.params;
            if (cart.length > 0) {
                const data = await CartServices.checkIfProductIdExist(cart[0].id, product_id);
                if (data) {
                    return Response.conflictError(res, "Product already exist in Cart")
                }
            }
        } catch (error) {
            return Response.serverError(res, "Internal server error")
        }
        next();
    }

    static async checkProductStatus(req, res, next) {
        try {
            const { product_id } = req.params;
            const product = await ProductServices.checkProductStatusAndQuantity(product_id)
            if (product.status === "out_of_stock") {
                return Response.badrequestError(res, "Product is out of stock, please check back later")
            }

        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
        next();
    }

    static async updateProductStatusAndQuantity(req, res, next) {
        try {
            const { id } = req.params;
            const product_id = await CartServices.checkIfCartIdExist(id);
            const product = await ProductServices.checkProductStatusAndQuantity(product_id);
            const newQuant = product.quantity - 1;
            let status;
            if (newQuant === 0) {
                status == "out_of_stock"
            } else {
                status = "in_stock"
            }
            await ProductServices.updateProductStatusAndQuantity(newQuant, status, product_id)
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
        next()
    }

}

export default CartMiddleware;