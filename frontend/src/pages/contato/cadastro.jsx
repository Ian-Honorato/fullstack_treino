import axios from "axios";

export default async function Cadastro(produto) {
  try {
    const { nome, marca, categoria, descricao, valor } = produto;

    const response = await axios.post("http://localhost:3003/produtos/store", {
      nome,
      marca,
      categoria,
      descricao,
      valor,
    });
    if (response) return response;
  } catch (e) {
    const { status, data } = e.response;
    const erroResponse = {
      statusRequest: status,
      ErrorData: data,
    };
    console.log(erroResponse);
  }
}
