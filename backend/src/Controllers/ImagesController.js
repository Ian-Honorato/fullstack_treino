import multer from "multer";
import multerConfig from "../config/multerconfig";
import Image from "../Models/Image";
import { where } from "sequelize";
import { up } from "../migrations/20250130003138-foto-produtos";

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
        const { flag } = req.body;
        const { id } = req.params;
        const flagValue = flag === "true";
        const id_produto = Number(id);
        if (!id) {
          return res.status(400).json("faltou o id na req");
        }

        if (flagValue === true) {
          const findImages = await Image.findAll({
            where: {
              id_produto: id_produto,
            },
          });
          if (findImages.length > 3) {
            return res.status(400).json({
              mensagem: "não podermos ter mais de 3 imagens por produto",
            });
          }
          console.log("passou no up");
          const updateFlag = await Image.update(
            { flag: "false" },
            { where: { id_produto: id_produto } }
          );
        }
        console.log("chegou no insert");
        const createImage = await Image.create({
          originalname,
          filename,
          flag: flagValue ? "true" : "false",
          id_produto,
        });

        return res.status(200).json({
          mensagem: "Imagem inserida com sucesso",
        });
      } catch (e) {
        console.log(e);

        return res.status(400).json({
          mensagem: "Ocorreu um erro ao realizar o upload - 2",
        });
      }
    });
  }
}
export default new ImagesController();
