import axios from "axios";
import PropTypes from "prop-types";

export const updateProduto = async (produto) => {
  const id = produto.id;

  const url = `http://localhost:3003/produtos/${id}`;
  try {
    const token = sessionStorage.getItem("authToken");
    const response = await axios.put(url, produto, {
      headers: { Authorization: `Bearer ${token}` },
    });

    //console.log(response);
    if (
      response.status === 200 &&
      response.data.mensagem == "Produto atualizado"
    ) {
      return response.data;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};
updateProduto.propTypes = {
  produto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    valor: PropTypes.number.isRequired,
  }).isRequired,
};
