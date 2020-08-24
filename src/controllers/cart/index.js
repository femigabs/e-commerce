import { CartServices, UserServices, ProductServices } from "../../services";
import { Response } from '../../utils';

class CartController {

    static async createCart(req, res) {
        const { email } = res.locals.user;
        try {
            const { product_id } = req.params;
            const user = await UserServices.checkIfUserExist(email);
            const user_id = user.id;
            const product = await ProductServices.checkIfProductIdExist(product_id);            
            const newCart = await CartServices.createCart(user_id, product[0].id, product[0].price, product[0].price);
            return newCart
                ? Response.created(
                    res,
                    newCart,
                    "Cart created successfully."
                )
                : Response.badrequestError(
                    res,
                    "Error creating Cart"
                )
        } catch (error) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async getCartByUserId(req, res) {
        const { email } = res.locals.user;
        try {
            const user = await UserServices.checkIfUserExist(email);
            const user_id = user.id;
            const cart = await CartServices.getCartByUserId(user_id)

            return cart
                ? Response.ok(
                    res,
                    cart,
                    "Cart fetched successfully."
                )
                : Response.badrequestError(
                    res,
                    "Error fetching Cart."
                )
        } catch (error) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async deleteCart(req, res) {
        try {
            const { id } = req.params;
            const cart = await CartServices.deleteCart(id);

            return cart
                ? Response.ok(
                    res,
                    cart,
                    'Cart deleted successfully'
                )
                : Response.badrequestError(
                    res,
                    'Error deleting Cart'
                )
        } catch (e) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async updateCart(req, res) {
        try {
            const { id } = req.params;
            const cart = await CartServices.updateCart(id, req.body);

            return cart
                ? Response.ok(
                    res,
                    cart,
                    'Cart updated successfully'
                )
                : Response.badrequestError(
                    res,
                    'Error updating Category'
                )
        } catch (error) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

}

export default CartController;