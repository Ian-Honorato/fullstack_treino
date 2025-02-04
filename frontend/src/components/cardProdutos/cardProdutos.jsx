import { CiHeart } from "react-icons/ci";
import PropTypes from "prop-types";

const CardProdutos = ({ produtos, onNavigate }) => {
  //console.log(produtos);

  const imageTrue = produtos.Images?.find((img) => img.flag === "true");
  //aqui procuro no array imagens a imagem que contem a flag true
  return (
    <div
      key={produtos.id}
      className="relative overflow-hidden bg-white border border-gray-200 rounded-xl"
    >
      <div className="relative w-[260px] m-5">
        <div className="absolute top-2 right-3">
          <a href="#" className="text-decoration-none">
            <CiHeart className="size-6 hover:text-red-500" />
          </a>
        </div>
        <div className="w-full h-[250px] text-center">
          {/* Aqui verifico se tem imagem */}
          {imageTrue ? (
            <img
              src={imageTrue.url}
              alt={produtos.nome}
              className="w-full h-full"
            />
          ) : (
            <div className="text-center text-[10px]">
              Ainda não temos imagem
            </div>
          )}
        </div>
        <div className="w-full px-2 py-4">
          <p className="text-[12px] uppercase text-primary">{produtos.marca}</p>
          <h3 className="py-2">{produtos.nome}</h3>
          <p className="py-2">R$ {produtos.valor}</p>
        </div>
        <div className="">
          <button
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-bold text-white transition-all duration-200 bg-green-600 hover:bg-green-800 rounded-sm"
            onClick={() => onNavigate(produtos)}
          >
            Ver mais
          </button>
        </div>
      </div>
    </div>
  );
};
/* Aqui estou utilizando o proptypes para validar os tipos de dados que espero receber,
sendo eles um objeto produto(dados do produto e um array de imagens), e a função navigate */
CardProdutos.propTypes = {
  produtos: PropTypes.shape({
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
  }).isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default CardProdutos;
