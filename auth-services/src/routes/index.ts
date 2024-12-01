import express from "express";
import Register from "./auth/create";
import login from "./auth/login";
import logout from "./auth/logout";
import deleteAccount from "./auth/delete-account";
import passwordReset from "./auth/password-reset";
import QRLogin from "./auth/qrLogin";

const router = express.Router();

router.use("/auth", Register);
router.use("/auth", login);
router.use("/auth", deleteAccount);
router.use("/auth", logout);
router.use("/auth", passwordReset);
router.use("/auth", QRLogin);

export default router;
