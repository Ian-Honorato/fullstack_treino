import React from "react";
import CardProdutos from "../cardProdutos/cardProdutos";
import PropTypes from "prop-types";
const ListaProdutos = ({ produtos, onNavigate }) => {
  // console.log(produtos);
  return (
    <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3 lg:grid-cols-5 sm:mt-10">
      {/* como tempos um array de produtos, utilizo o mapp para percorrer o array e renderizar os cards,
        passando para o componente os parametros id, o objeto produto e a função navigate para cada card */}
      {produtos.map((produto) => (
        <CardProdutos
          key={produto.id}
          produtos={produto}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
};
// Aqui espero receber um array contendo o objeto(produto e onNavigate)
ListaProdutos.propTypes = {
  produtos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
      valor: PropTypes.number.isRequired,
      marca: PropTypes.string.isRequired,
      Images: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          url: PropTypes.string.isRequired,
          flag: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default ListaProdutos;
