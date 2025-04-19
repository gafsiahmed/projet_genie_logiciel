import { Router } from "express";
import {
    resetPassword,
    sendPasswordResetToken,
} from "../controllers/forgetpassword.controller";
import { authorize } from "../middleware/auth.middleware";
import { verifyChangePasswordToken } from "../middleware/forgetpassword.middleware";
import { checkCredentials } from "../middleware/user.middleware";
import { AuthController } from "../presentation/controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/auth", [checkCredentials, authController.login.bind(authController)]);
router.get("/refreshtoken", authController.handleRefreshToken.bind(authController));
router.get("/logged", authorize, authController.getLoggedUser.bind(authController));
router.post("/checkemail", sendPasswordResetToken);
router.post("/forgetpassword/:token", verifyChangePasswordToken, resetPassword);
router.get("/logout", authController.logout.bind(authController));

export default router;
