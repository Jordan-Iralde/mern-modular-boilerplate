import express from "express";
import { login, register, getUserData, deleteAccount, testToken} from "./auth.controller.js";


const router = express.Router();

router.post("/login", login);
router.get("/getdata", getUserData);
router.post("/register", register);
router.delete("/delete", deleteAccount);
router.get("/test-token", testToken);

export default router;
