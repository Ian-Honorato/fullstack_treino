import Sequelize, { Model } from "sequelize";

export default class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        marca: Sequelize.STRING,
        categoria: Sequelize.STRING,
        descricao: {
          type: Sequelize.STRING,
          defaultValue: "",
        },

        valor: {
          type: Sequelize.FLOAT,
          isFloat: { msg: "o preço deve ser valor numérico" },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.hasMany(models.Image, { foreignKey: "id_produto" });
  }
}
