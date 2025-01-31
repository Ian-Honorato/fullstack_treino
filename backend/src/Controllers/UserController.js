import homeRoutes from "../routes/homeRoutes";
import User from "../Models/User";
import { up } from "../migrations/20250120214045-users";
import { where } from "sequelize";
import bcrypt from "bcryptjs";

class UserController {
  constructor() {}

  async index(req, res) {
    try {
      const user = await User.findAll();

      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: "Ocorreu um erro" + e,
      });
    }
  }

  async store(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({
          error: "Nome, email e senha são obrigatórios",
        });
      }

      const userData = {
        nome,
        email,
        senha,
      };

      const user = await User.create(userData);

      res.json("criou o usuario");
    } catch (e) {
      console.log(e);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "é necessario o Id",
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(400).json({
          error: "O usuario não foi localizado!",
        });
      }

      res.status(200).json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: "Ocorreu um erro" + e,
      });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;
      if (!nome || !email || !senha) {
        return res.status(400).json({
          error:
            "Preencha a rquisição com os dados corretos (nome, email e senha)",
        });
      }
      const user = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
      };
      console.log(senha);
      if (senha) {
        const salt = await bcrypt.genSalt(8);
        user.senha_hash = await bcrypt.hash(senha, salt);
      }
      console.log(user.senha);
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({
          error: "Este email já está em uso",
        });
      }

      const updateUser = await User.update(
        user,

        { where: { id } }
      );

      if (updateUser[0].length === 0) {
        return res.status(400).json({
          error: "ocorreu algum erro ao atualizar",
        });
      }
      const dataUser = await User.findByPk(id);

      return res.status(200).json({
        mensagem: "alteração realizada com sucesso",
        usuario: dataUser,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: "Ocorreu um erro" + e,
      });
    }
  }
}
export default new UserController();
