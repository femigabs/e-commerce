import { Router } from 'express';
import { UserMiddleware, CartMiddleware } from "../middleware";
import { CartController } from "../controllers"

const router = new Router();

router.post("/:product_id", UserMiddleware.verifyToken, CartMiddleware.cart, CartController.createCart);
router.get("/", UserMiddleware.verifyToken, CartController.getCartByUserId);
router.delete("/:id", UserMiddleware.verifyToken, CartMiddleware.checkCartId, CartController.deleteCart);
router.put("/:id", UserMiddleware.verifyToken, CartMiddleware.checkCartId, CartController.updateCart);

export default router;