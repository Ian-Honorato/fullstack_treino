import Sequelize from "sequelize";
import databaseConfig from "../config/database";

import Produto from "../Models/Produto";
import User from "../Models/User";
import Image from "../Models/Image";

const connection = new Sequelize(databaseConfig);

const models = [Produto, User, Image];

models.forEach((model) => model.init(connection));

/* Connectando o Model ao Banco de dados */
/* Não esquecer de add os models aqui */
