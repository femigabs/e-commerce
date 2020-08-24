import { Router } from 'express';
import { UserMiddleware, OrderMiddleware } from "../middleware";
import { OrderController} from "../controllers"

const router = new Router();

router.post("/", UserMiddleware.verifyToken, OrderMiddleware.createMiddleWare, OrderController.createOrderDetails);
router.get("/", UserMiddleware.verifyToken, OrderController.getOrderDetailsByUserId);
router.delete("/:id", UserMiddleware.verifyToken, OrderMiddleware.checkOrderDetailsId, OrderController.deleteOrderDetails);
router.put("/:id", UserMiddleware.verifyToken, OrderMiddleware.checkOrderDetailsId, OrderController.updateOrderDetails);

export default router;