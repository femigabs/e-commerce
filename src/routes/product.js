import { Router } from 'express';
import { UserMiddleware, ProductMiddleware, upload } from "../middleware";
import { ProductController } from "../controllers"

const router = new Router();

router.post("/subcategory/product/:product_sub_category", UserMiddleware.verifyToken, UserMiddleware.adminAuth, upload, ProductMiddleware.createMiddleWare, ProductMiddleware.product, ProductController.createProduct);
router.get("/subcategory/product", ProductController.getAllProduct);
router.get("/subcategory/product/search", ProductMiddleware.productMiddleWare, ProductController.searchProduct);
router.get("/subcategory/product/:product_sub_category", ProductController.getProductBySubCategory);
router.delete("/subcategory/product/:id", UserMiddleware.verifyToken, UserMiddleware.adminAuth, ProductMiddleware.checkProductId, ProductController.deleteProduct);
router.put("/subcategory/product/:id", UserMiddleware.verifyToken, UserMiddleware.adminAuth, upload, ProductController.updateProduct);


export default router;