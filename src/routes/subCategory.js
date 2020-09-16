import { Router } from 'express';
import { UserMiddleware, SubCategoryMiddleware } from "../middleware";
import { SubCategoryController } from "../controllers"

const router = new Router();

router.post("/sub/:category_id", UserMiddleware.verifyToken, UserMiddleware.adminAuth, SubCategoryMiddleware.createMiddleWare, SubCategoryMiddleware.subCategory, SubCategoryController.createSubCategory);
router.get("/sub/:category_id", SubCategoryController.getSubCategoryByCategoryId);
router.get("/subname/:category_id", SubCategoryController.getProductSubCategoryByCategoryId);
router.get("/sub", SubCategoryController.getAllSubCategory);
router.delete("/sub/:id", UserMiddleware.verifyToken, UserMiddleware.adminAuth, SubCategoryMiddleware.checkSubCategoryId, SubCategoryController.deleteSubCategory);
router.put("/sub/:id", UserMiddleware.verifyToken, UserMiddleware.adminAuth, SubCategoryController.updateSubCategory)

export default router;