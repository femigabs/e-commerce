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
            const cart = await CartServices.getCartByUserId(user_id)
            if (cart.length === 0) {
                const cart = await CartServices.createCart(user_id)
                const cartProduct = await CartServices.createCartProduct(cart.id, product.id, product.price, product.price)
                return Response.created(res, cartProduct, "Cart added successfully.")
            } else if (cart.length > 0) {
                const cartProduct = await CartServices.createCartProduct(cart[0].id, product.id, product.price, product.price)
                return Response.created(res, cartProduct, "Cart added successfully.")
            }
            return Response.badrequestError(res, "Error creating Cart")
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async getCartProduct(req, res) {
        const { email } = res.locals.user;
        try {
            const user = await UserServices.checkIfUserExist(email);
            const user_id = user.id;
            const cart = await CartServices.getCartByUserId(user_id)
            const cartProduct = await CartServices.getCartProductByCartId(cart[0].id)

            return cartProduct
                ? Response.ok(res, cartProduct, 'Cart fetched successfully')
                : Response.badrequestError(res, 'Error fetching Cart')
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async deleteCart(req, res) {
        const { email } = res.locals.user;
        try {
            const user = await UserServices.checkIfUserExist(email);
            const user_id = user.id;
            const carts = await CartServices.getCartByUserId(user_id);
            if (carts.length > 0) {
                const cart = await CartServices.deleteCart(carts[0].id);
                return Response.ok(res, cart, 'Cart deleted successfully')
            } else if (cart.length === 0) {
                return Response.badrequestError(res, 'Cart is empty')
            }
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async deleteCartProduct(req, res) {
        try {
            const { id } = req.params;
            const cart = await CartServices.deleteCartProduct(id);

            return cart
                ? Response.ok(res, cart, 'Cart Product deleted successfully')
                : Response.badrequestError(res, 'Error deleting Cart Product')
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async updateCart(req, res) {
        try {
            const { id } = req.params;
            const cart = await CartServices.updateCart(id, req.body);
            return cart
                ? Response.ok(res, cart, 'Cart updated successfully')
                : Response.badrequestError(res, 'Error updating Category')
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async sumSubTotal(req, res) {
        const { email } = res.locals.user;
        try {
            const user = await UserServices.checkIfUserExist(email);
            const user_id = user.id;
            const cart = await CartServices.getCartByUserId(user_id)
            const total = await CartServices.sumSubTotal(cart[0].id)
            return total
                ? Response.ok(res, total, 'SubTotal summed successfully')
                : Response.badrequestError(res, 'Error summing SubTotal')
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }
}

export default CartController;