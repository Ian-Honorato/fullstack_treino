import { Router } from "express";
import imagensController from "../Controllers/ImagesController";
import loginRequired from "../Middlewares/LoginRequired";
const router = new Router();

router.post("/:id", loginRequired, imagensController.store);

export default router;
