import config from '../../config';
import axios from 'axios'
import { Response } from '../../utils';
import { TransactionServices, UserServices, CartServices } from "../../services"

class TransactionController {

    static async bankPayment(req, res) {
        const { email } = res.locals.user;
        try {
            const {
                amount, bank: { code, account_number }, birthday
            } = req.body;
            const options = {
                url: 'https://api.paystack.co/charge',
                method: 'POST',
                port: 443,
                headers: {
                    Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    email, amount, bank: { code, account_number }, birthday
                }
            };
            const transaction = await axios(options);
            const { data } = transaction.data;
            return res.json(data)
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async cardPayment(req, res) {
        const { email } = res.locals.user;
        try {
            const user = await UserServices.checkIfUserExist(email);
            const user_id = user.id;
            const cart = await CartServices.getCartByUserId(user_id)
            const amount = await CartServices.sumSubTotal(cart[0].id);
            const {
                card: {
                    cvv, number, expiry_month, expiry_year
                },
                pin
            } = req.body;
            const options = {
                url: 'https://api.paystack.co/charge',
                method: 'POST',
                port: 443,
                headers: {
                    Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    email,
                    amount: amount.sum,
                    card: { cvv, number, expiry_month, expiry_year },
                    pin
                }
            };
            const transaction = await axios(options);
            const { data } = transaction.data;
            await TransactionServices.createTransaction(user.id, data);
            return res.json(data)
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async verifyPayment(req, res) {
        try {
            const { reference } = req.params;
            const options = {
                url: `https://api.paystack.co/transaction/verify/${reference}`,
                method: 'GET',
                port: 443,
                headers: {
                    Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
                }
            };
            const transactionStatus = await axios(options);
            const { data } = transactionStatus.data;
            if (data.status === "success") {
                await TransactionServices.verifyTransaction("success", reference)
            } else {
                await TransactionServices.verifyTransaction("failed", reference)
            }
            return res.json(data)
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async refundPayment(req, res) {
        try {
            const { reference } = req.params;
            const { amount } = req.body;
            const options = {
                url: 'https://api.paystack.co/refund',
                method: 'POST',
                port: 443,
                headers: {
                    Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                },
                data: { transaction: reference, amount }
            }
            const refund = await axios(options);
            const { data } = refund.data;
            return res.json(data)
        } catch (error) {
            console.log("TransactionController -> refundPayment -> error", error)
            return Response.serverError(res, "Internal Server Error.")
        }
    }
}

export default TransactionController;