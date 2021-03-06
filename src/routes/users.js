import { Router } from 'express';
import { UserMiddleware } from "../middleware";
import { UserController } from "../controllers"

const router = new Router();

router.post("/register", UserMiddleware.signupMiddleWare, UserMiddleware.signupUser, UserController.signup);
router.post("/confirmation", UserMiddleware.checkId, UserMiddleware.checkCode, UserMiddleware.checkExpiry, UserController.updateVerificationStatus);
router.put("/confirmation", UserMiddleware.checkId, UserController.resendVerificationCode);
router.post("/login", UserMiddleware.loginMiddleWare, UserMiddleware.loginUser, UserMiddleware.checkVerification, UserController.login);
router.post("/forgot-password", UserMiddleware.emailMiddleWare, UserController.forgetPassword)
router.put("/reset-password", UserMiddleware.checkResetCode, UserMiddleware.checkExpiry, UserController.resetPassword)

export default router;