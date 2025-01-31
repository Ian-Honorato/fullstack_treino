import express from "express";
import jwt from "jsonwebtoken";
import User from "../Models/User";

export default async (req, res, next) => {
  //recebendo o header do insomia com a auth
  const { authorization } = req.headers;
  //caso nao seja enviado - devolvo o erro
  if (!authorization) {
    return res.status(401).json({
      error: "Login requerido!",
    });
  }
  //dividimos o texto que vem na autorização pelo espaço -> Authorization: Bearer <token>
  const [texto, token] = authorization.split(" ");

  try {
    //o jwt veifica o token recebido e compara com a chave criada
    const dados = jwt.verify(token, process.env.token_secret);
    //depois de decodificar as chaves extaí delas o id e o email
    const { id, email } = dados;

    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      return res.status(400).json({
        error: "usuario invalido",
      });
    }
    //se estiver tudo certo, busca a proxima rota
    return next();
  } catch (e) {
    console.log(e);
    if (e.name == "JsonWebTokenError") {
      return res.status(401).json("Token Invalido");
    }
  }
};
