import homeRoutes from "../routes/homeRoutes";
import Produto from "../Models/Produto";

class HomeController {
  constructor() {}
  async index(req, res) {
    /*     const novoProd = await Produto.create({
      nome: "Coca-cola",
      marca: "Coca-cola",
      categoria: "Bebibas sem alcool",
      valor: 6.5,
    }); */
    res.json({
      Cheguei: "HomeController",
    });
  }
}
export default new HomeController();
