import homeRoutes from "../routes/homeRoutes";
import Produto from "../Models/Produto";

class ProdutoController {
  constructor() {}
  async index(req, res) {
    try {
      const produtos = await Produto.findAll({
        attributes: ["id", "nome", "marca", "categoria", "descricao", "valor"],
        order: [["id", "DESC"]],
      });
      res.json(produtos);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: "Ocorreu um erro",
      });
    }
  }
  async store(req, res) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          error: ["A requisição não pode ser vazia"],
        });
      }

      const { nome, marca, categoria, descricao, valor } = req.body;

      if (!nome || !marca || !categoria || !valor) {
        return res.status(400).json({
          error: ["O campos nome, marca, categoria e valor são obrigatórios"],
        });
      }
      const produto = { nome, marca, categoria, descricao, valor };

      const insertProduto = await Produto.create(produto);

      return res.status(200).json({
        mensagem: "Produto inserido com sucesso!",
        produto_inserido: insertProduto,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: "ocorreu um erro",
      });
    }
  }
  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "id não enviado",
        });
      }

      const produto = await Produto.findByPk(id, {
        attributes: ["id", "nome", "marca", "categoria", "descricao", "valor"],
      });
      if (!produto) {
        return res.status(400).json({
          error: "Produto não Localizado",
        });
      }

      return res.status(200).json(produto);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: "ocorreu um erro na requisição",
      });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          error: "é necessário enviar o id",
        });
      }
      const { nome, marca, categoria, descricao, valor } = req.body;

      if (!nome || !marca || !categoria || !valor) {
        return res.status(400).json({
          error: ["O campos nome, marca, categoria e valor são obrigatórios"],
        });
      }
      const produto = await Produto.update(
        {
          nome: req.body.nome,
          marca: req.body.marca,
          categoria: req.body.categoria,
          descricao: req.body.descricao,
          valor: req.body.valor,
        },
        {
          where: { id },
        }
      );

      if (produto === 0) {
        return res.status(400).json({
          error: "não foi possivel atualizar",
        });
      }
      const novoProduto = await Produto.findByPk(id);

      if (!novoProduto) {
        return res.status(400).json({
          error: "não localizou o novo produto",
        });
      }

      return res.json({
        mensagem: "Produto atualizado",
        novoProduto: novoProduto,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: "erro na requisição",
      });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          error: "É necessairo enviar o ID",
        });
      }

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(404).json({
          error: "Produto não encontrado",
        });
      }

      const delet = await Produto.destroy({ where: { id } });

      if (delet === 0) {
        return res.status(400).json({
          error: "Nenhum produto foi deletado",
        });
      }

      res.status(200).json({
        mensagem: "produto deletado com sucesso",
        produtoDeletado: produto,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: "Erro na requisição",
      });
    }
  }
}

export default new ProdutoController();
