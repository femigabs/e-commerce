import config from '../../config';
import axios from 'axios'
import { Response } from '../../utils';

class TransactionController {

    static async cardPayment(req, res) {
        const { order_id } = req.params;
        try {
            const {
                email, amount,
                card: {
                    cvv, number, expiry_month, expiry_year
                },
                pin
            } = req.body;

            const options = {

            }
            const configData = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        } catch (error) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }
}

export default TransactionController;