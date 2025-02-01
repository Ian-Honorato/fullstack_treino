import Sequelize from "sequelize";
import Produto from "./Produto";
import Image from "./Image";

const sequelize = new Sequelize(/* configuração do banco */);

const models = {
  Produto: Produto.init(sequelize),
  Image: Image.init(sequelize),
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export default models;
