import { Router } from 'express';
import { UserMiddleware, SubCategoryMiddleware } from "../middleware";
import { SubCategoryController } from "../controllers"

const router = new Router();

router.post("/:category_id", UserMiddleware.verifyToken, UserMiddleware.adminAuth, SubCategoryMiddleware.createMiddleWare, SubCategoryMiddleware.subCategory, SubCategoryController.createSubCategory);
//router.get("/:category_id", SubCategoryController.getSubCategoryByCategoryId);
router.get("/:category_id", SubCategoryController.getProductSubCategoryByCategoryId);
router.get("/", SubCategoryController.getAllSubCategory);
router.delete("/:id", UserMiddleware.verifyToken, UserMiddleware.adminAuth, SubCategoryMiddleware.checkSubCategoryId, SubCategoryController.deleteSubCategory);
router.put("/:id", UserMiddleware.verifyToken, UserMiddleware.adminAuth, SubCategoryController.updateSubCategory)

export default router;