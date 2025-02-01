import express from "express";
// Banco de dados
import "./src/database/";
// Rotas da aplicação
import homeRoutes from "./src/routes/homeRoutes";
import userRoutes from "./src/routes/userRoutes";
import produtoRoutes from "./src/routes/produtoRoutes";
import loginRoutes from "./src/routes/loginRoutes";
import imageRoutes from "./src/routes/imageRoutes";
// CORS
import cors from "cors";

//RESOLVE
import { resolve } from "path";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Habilitar CORS para requisições de qualquer origem (ajustar conforme necessário)
    this.app.use(
      cors({
        origin: "http://localhost:5173", // Permite o frontend em localhost:5173
        methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
        allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
      })
    );
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, "upload")));
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/produtos/", produtoRoutes);
    this.app.use("/usuario/", userRoutes);
    this.app.use("/login/", loginRoutes);
    this.app.use("/images/", imageRoutes);
  }
}

export default new App().app;
