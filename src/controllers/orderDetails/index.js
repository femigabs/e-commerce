import { OrderDetailsServices, UserServices } from '../../services';
import { Response } from '../../utils';

class OrderDetailsController {

    static async createOrderDetails(req, res) {
        const { email } = res.locals.user;
        try {
            const user = await UserServices.checkIfUserExist(email);
            const user_id = user.id;
            const orderDetails = await OrderDetailsServices.getOrderDetailsByUserId(user_id);
            if (orderDetails.length === 0) {
                const address = await OrderDetailsServices.createOrderDetails(user_id, req.body, true);
                return Response.created(res, address, "Order Details created successfully.")
            }
            if (orderDetails.length > 0) {
                const address = await OrderDetailsServices.createOrderDetails(user_id, req.body, false);
                return Response.created(res, address, "Order Details created successfully.")
            }
            return Response.badrequestError(res, "Error creating Order Details")
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async deleteOrderDetails(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderDetailsServices.deleteOrderDetails(id);

            return order
                ? Response.ok(res, order, 'Order Details deleted successfully')
                : Response.badrequestError(res, 'Error deleting Order Details')
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async updateOrderDetails(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderDetailsServices.updateOrderDetails(id, req.body);

            return order
                ? Response.ok(res, order, 'Order Details updated successfully'
                )
                : Response.badrequestError(res, 'Error updating Order Details')
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async getOrderDetailsByUserId(req, res) {
        const { email } = res.locals.user;
        try {
            const user = await UserServices.checkIfUserExist(email);
            const user_id = user.id;
            const order = await OrderDetailsServices.getOrderDetailsByUserId(user_id)

            return order
                ? Response.ok(res, order, "Order Details successfully fetched.")
                : Response.badrequestError(res, "Error fetching Order Details.")
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async setDefaultAddress(req, res) {
        const { email } = res.locals.user;
        try {
            const { id } = req.params;
            const user = await UserServices.checkIfUserExist(email);
            const user_id = user.id;
            await OrderDetailsServices.resetAddress(user_id);
            const address = await OrderDetailsServices.setDefaultAddress(id);

            return address
                ? Response.ok(res, address, 'Order Details updated successfully')
                : Response.badrequestError(res, 'Error updating Order Details')
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

}

export default OrderDetailsController;