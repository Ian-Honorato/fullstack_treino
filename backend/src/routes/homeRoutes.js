import { Router } from "express";
import homeController from "../Controllers/HomeController";

const router = new Router();

router.get("/", homeController.index);

export default router;
