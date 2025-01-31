import { Router } from "express";
import userController from "../Controllers/UserController";
//midleware que controla a seção
import loginRequired from "../Middlewares/LoginRequired";
const router = new Router();

router.get("/", loginRequired, userController.index);
router.post("/store", userController.store);
router.put("/:id", loginRequired, userController.update);

/* router.get("/:id", userController.show); */
export default router;
