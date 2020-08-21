import { Router } from 'express';
import { UserMiddleware, CategoryMiddleware } from "../middleware";
import { CategoryController } from "../controllers"

const router = new Router();

router.post("/", UserMiddleware.verifyToken, UserMiddleware.adminAuth, CategoryMiddleware.createMiddleWare, CategoryMiddleware.category, CategoryController.createCategory);
router.get("/", CategoryController.getAllCategory);
router.put("/:id", UserMiddleware.verifyToken, UserMiddleware.adminAuth, CategoryController.updateCategory);
router.delete("/:id", UserMiddleware.verifyToken, UserMiddleware.adminAuth, CategoryMiddleware.checkCategoryId, CategoryController.deleteCategory);

export default router;