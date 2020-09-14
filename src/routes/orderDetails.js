import { Router } from 'express';
import { UserMiddleware, OrderMiddleware } from "../middleware";
import { OrderController} from "../controllers"

const router = new Router();

router.post("/order_details", UserMiddleware.verifyToken, OrderMiddleware.createMiddleWare, OrderController.createOrderDetails);
router.get("/order_details", UserMiddleware.verifyToken, OrderController.getOrderDetailsByUserId);
router.delete("/order_details/:id", UserMiddleware.verifyToken, OrderMiddleware.checkOrderDetailsId, OrderController.deleteOrderDetails);
router.put("/order_details/:id", UserMiddleware.verifyToken, OrderMiddleware.checkOrderDetailsId, OrderController.updateOrderDetails);
router.put("/order_details/default/:id", UserMiddleware.verifyToken, OrderMiddleware.checkOrderDetailsId, OrderController.setDefaultAddress);

export default router;