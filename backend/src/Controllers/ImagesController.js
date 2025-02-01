import multer from "multer";
import multerConfig from "../config/multerconfig";
import Image from "../Models/Image";
import Produto from "../Models/Produto";
import { where } from "sequelize";

const upload = multer(multerConfig).single("arquivo");

class ImagesController {
  async store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        //console.log(err);
        return res.status(400).json({
          mensagem: "Ocorreu um erro ao realizar o upload - 1",
          erro: err.code,
        });
      }
      if (!req.file) {
        return res.status(400).json({
          mensagem: "É necessário enviar uma imagem!",
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { id, ativo } = req.body;
        const id_produto = Number(id);
        const flag = String(ativo);
        //verificações que dos dados vindos da req
        if (!id) {
          return res.status(400).json("faltou o id na req");
        }
        const produto = await Produto.findByPk(id_produto);
        if (!produto) {
          return res.status(400).json({ mensagem: "Produto não encontrado." });
        }
        if (flag !== "true" && flag !== "false") {
          return res.status(400).json({
            mensagem: "Flag só permite string true e false",
          });
        }

        if (flag === "true") {
          await Image.update(
            { flag: "false" },
            { where: { id_produto: id_produto } }
          );
        }

        const createImage = await Image.create({
          originalname,
          filename,
          flag,
          id_produto,
        });
        if (createImage) {
          return res.status(200).json({
            mensagem: "Imagem inserida com sucesso",
            originalname,
            flag,
            id_produto,
          });
        }
        return res.status(200).json({
          mensagem: "Imagem inserida com sucesso",
        });
      } catch (e) {
        console.log(e);

        return res.status(400).json({
          mensagem: "Ocorreu um erro ao realizar o upload ",
        });
      }
    });
  }
}

export default new ImagesController();
