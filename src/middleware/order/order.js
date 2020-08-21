import { Validate, Response } from "../../utils";
import { OrderServices } from "../../services";

class OrderMiddleware {

    static async createMiddleWare(req, res, next) {
        try {
            await Validate.schema.orderDetails.validateAsync(req.body);
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

    static async checkOrderDetailsId(req, res, next) {
        const { id } = req.params;
        const orderId = await OrderServices.checkIfOrderDetailsIdExist(id);
        if (orderId) {
            return next();
        }
        return Response.notFoundError(res, 'Order does not exist');
    }
}

export default OrderMiddleware