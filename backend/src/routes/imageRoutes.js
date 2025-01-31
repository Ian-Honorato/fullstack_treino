import { Router } from "express";
import imagensController from "../Controllers/ImagesController";
import loginRequired from "../Middlewares/LoginRequired";
const router = new Router();

router.post("/", loginRequired, imagensController.store);

export default router;
