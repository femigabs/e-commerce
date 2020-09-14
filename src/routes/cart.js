import { Router } from 'express';
import { UserMiddleware, CartMiddleware } from "../middleware";
import { CartController } from "../controllers"

const router = new Router();

router.post("/:product_id", UserMiddleware.verifyToken, CartMiddleware.cart, CartMiddleware.checkProductStatus, CartController.createCart);
router.get("/", UserMiddleware.verifyToken, CartController.getCartProduct);
router.get("/total", UserMiddleware.verifyToken, CartController.sumSubTotal);
router.delete("/:id", UserMiddleware.verifyToken, CartMiddleware.checkCartProductId, CartController.deleteCartProduct);
router.delete("/", UserMiddleware.verifyToken, CartMiddleware.checkCart, CartController.deleteCart);
router.put("/:id", UserMiddleware.verifyToken, CartMiddleware.checkCartProductId, CartController.updateCart);

export default router;