import { Router } from "express";
import produtoController from "../Controllers/ProdutoController";
import LoginRequired from "../Middlewares/LoginRequired";

const router = new Router();

router.get("/", produtoController.index); // no index listar todos - rota aberta
router.post("/store", LoginRequired, produtoController.store); // cadastrar novos produtos - rota fechada
router.get("/:id", produtoController.show); // listar 1 produto pelo id - rota aberta
router.put("/:id", LoginRequired, produtoController.update); // alterar 1 produto - rota fechada
router.delete("/:id", LoginRequired, produtoController.delete); // excluir 1 produto - rota fechada

export default router;
