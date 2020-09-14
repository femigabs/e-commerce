import { Router } from 'express';
import { UserMiddleware } from "../middleware";
import { TransactionController } from "../controllers"

const router = new Router();

router.post("/cardpayment", UserMiddleware.verifyToken, TransactionController.cardPayment);
router.get("/verifypayment/:reference", UserMiddleware.verifyToken, TransactionController.verifyPayment);
router.post("/refundpayment/:reference", UserMiddleware.verifyToken, UserMiddleware.adminAuth, TransactionController.refundPayment);

export default router;