import Sequelize, { Model } from "sequelize";
import appConfig from "../config/appConfig";

export default class Image extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "",
          field: "originalname",
          validate: {
            notEmpty: {
              msg: "O campo originalname deve ser preenchido",
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "",
          field: "filename",
          validate: {
            notEmpty: {
              msg: "O campo filename nao pode ser vazio",
            },
          },
        },
        flag: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "false",
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${appConfig.url}/images/${this.getDataValue("filename")}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'images'
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Produto, { foreignKey: "id_produto" });
  }
}
