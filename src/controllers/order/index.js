import { OrderServices, CartServices, UserServices } from '../../services';
import { Response } from '../../utils';

class OrderController {

    static async createOrder(req, res) {
        const { email } = res.locals.user;
        try {
            const user = await UserServices.checkIfUserExist(email);
            const cart = await CartServices.getCartByUserId(user.id);
            const cartProduct = await CartServices.getCartProduct(cart[0].id);
            const order = await OrderServices.createOrder(cartProduct, user.id);

            return order 
            ? Response.created(res, order, 'Order created successfully')
            : Response.badrequestError(res, "Error creating Order")
        } catch (error) {
            console.log("OrderController -> createOrder -> error", error)
            return Response.serverError(res, "Internal Server Error.")
        }
    }
}

export default OrderController;