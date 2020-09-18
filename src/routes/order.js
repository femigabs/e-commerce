import { Router } from 'express';
import { UserMiddleware, CartMiddleware } from "../middleware";
import { OrderController} from "../controllers";

const router = new Router();

router.post("/", UserMiddleware.verifyToken, CartMiddleware.checkCartProduct, OrderController.createOrder)

export default router;