import { Router } from "express";
import {
  getLoggedUser,
  handleRefreshToken,
  login,
  logout,
} from "../controllers/auth.controller";
import {
  resetPassword,
  sendPasswordResetToken,
} from "../controllers/forgetpassword.controller";
import { authorize } from "../middleware/auth.middleware";
import { verifyChangePasswordToken } from "../middleware/forgetpassword.middleware";
import { checkCredentials } from "../middleware/user.middleware";

const router = Router();
("");

//router.post('/', login);
router.post("/auth", [checkCredentials, login]);
router.get("/refreshtoken", handleRefreshToken);


router.get("/logged", authorize, getLoggedUser);


router.post("/checkemail", sendPasswordResetToken);


router.post("/forgetpassword/:token", verifyChangePasswordToken, resetPassword);
router.get("/logout", logout);

export default router;
