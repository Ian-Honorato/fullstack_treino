import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 250],
              msg: "O nome deve ter entre 3 e 200 caracteres.",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Email já existe",
          },
          validate: {
            isEmail: {
              msg: "Email invalido",
            },
          },
        },
        senha_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        senha: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 100],
              msg: "a senha deve ter 3 a 100 caracteres",
            },
          },
        },
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", async (user) => {
      if (user.senha) {
        const salt = await bcrypt.genSalt(8);
        user.senha_hash = await bcrypt.hash(user.senha, salt);
      }
    });
    return this;
  }
  senhaValidate(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }
}
