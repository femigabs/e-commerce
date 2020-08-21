import { OrderServices, UserServices } from '../../services';
import { Response } from '../../utils';

class OrderController {

    static async createOrderDetails(req, res) {
        const { email } = res.locals.user;
        try {
            const user = await UserServices.checkIfUserExist(email);
            const user_id = user.id;
            const newOrder = await OrderServices.createOrderDetails(user_id, req.body);
            return newOrder
                ? Response.created(
                    res,
                    newOrder,
                    "Order Details created successfully."
                )
                : Response.badrequestError(
                    res,
                    "Error creating Order Details"
                )
        } catch(error) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async deleteOrderDetails(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderServices.deleteOrderDetails(id);

            return order
                ? Response.ok(
                    res,
                    order,
                    'Order Details deleted successfully'
                )
                : Response.badrequestError(
                    res,
                    'Error deleting Order Details'
                )
        } catch (error) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async updateOrderDetails(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderServices.updateOrderDetails(id, req.body);

            return order
                ? Response.ok(
                    res,
                    order,
                    'Order Details updated successfully'
                )
                : Response.badrequestError(
                    res,
                    'Error updating Order Details'
                )
        } catch (error) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async getOrderDetailsByUserId(req, res) {
        const { email } = res.locals.user;
        try {
            const user = await UserServices.checkIfUserExist(email);
            const user_id = user.id;
            const order = await OrderServices.getOrderDetailsByUserId(user_id)

            return order
                ? Response.ok(
                    res,
                    order,
                    "Order Details successfully fetched."
                )
                : Response.badrequestError(
                    res,
                    "Error fetching Order Details."
                )
        } catch (error) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

}

export default OrderController;