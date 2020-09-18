import { Router } from 'express';
import { UserMiddleware, OrderMiddleware } from "../middleware";
import { OrderDetailsController} from "../controllers"

const router = new Router();

router.post("/order_details", UserMiddleware.verifyToken, OrderMiddleware.createMiddleWare, OrderDetailsController.createOrderDetails);
router.get("/order_details", UserMiddleware.verifyToken, OrderDetailsController.getOrderDetailsByUserId);
router.delete("/order_details/:id", UserMiddleware.verifyToken, OrderMiddleware.checkOrderDetailsId, OrderDetailsController.deleteOrderDetails);
router.put("/order_details/:id", UserMiddleware.verifyToken, OrderMiddleware.checkOrderDetailsId, OrderDetailsController.updateOrderDetails);
router.put("/order_details/default/:id", UserMiddleware.verifyToken, OrderMiddleware.checkOrderDetailsId, OrderDetailsController.setDefaultAddress);

export default router;