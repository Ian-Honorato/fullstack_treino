import Sequelize from "sequelize";
import databaseConfig from "../config/database"; // Configuração do banco de dados

// Importando os modelos
import Produto from "../Models/Produto";
import User from "../Models/User";
import Image from "../Models/Image";

// Estabelecendo a conexão com o banco de dados
const connection = new Sequelize(databaseConfig);

// Inicializando os modelos com a conexão
const models = [Produto, User, Image];

// Inicializando todos os modelos
models.forEach((model) => model.init(connection));

// Realizando as associações entre os modelos
models.forEach((model) => {
  if (model.associate) {
    model.associate(connection.models); // Estabelecendo as associações
  }
});

// Exportando a conexão e os modelos para uso posterior
export { connection };
