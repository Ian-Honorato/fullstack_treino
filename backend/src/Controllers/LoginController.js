import User from "../Models/User";
import jwt from "jsonwebtoken";

class LoginController {
  async index(req, res) {
    res.json("chegou na rota de login");
  }
  async store(req, res) {
    //recebendo os dados pela req
    const { email = "", senha = "" } = req.body;
    //console.log("recebendo o email " + email);

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: "É necessário enviar o email e a senha",
      });
    }

    const user = await User.findOne({
      attributes: ["id", "email", "senha_hash"],
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        mensagem: "Não foi possivel localizar o usuario",
      });
    }

    // Se a senha do usuario não for valida
    //(!senha) -> resumindo... Aqui eu vou lá no user comparo a senha e volto para dar uma resposta
    if (!(await user.senhaValidate(senha))) {
      return res.status(400).json({
        mensagem: "Senha invalida",
      });
    }
    const { id } = user;
    //criando um token - uma assinatura com o jwt e passando o id, email e um token criado lá no env
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({
      mensagem: "Login realizado com Sucesso!!!",
      token: token,
    });
  }
}
export default new LoginController();
