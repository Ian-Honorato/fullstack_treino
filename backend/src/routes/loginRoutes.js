import loginController from "../Controllers/LoginController";
import { Router } from "express";

const router = new Router();

router.post("/", loginController.store);

export default router;
