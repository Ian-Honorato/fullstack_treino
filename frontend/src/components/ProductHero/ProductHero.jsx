import PropTypes from "prop-types";
const ProductHero = ({ produto }) => {
  const imageTrue = produto.Images?.find((img) => img.flag === "true");
  return (
    <div className=" p-10   flex flex-row flex-wrap justify-center align-center ">
      <div className="flex flex-row justify-center align-center ">
        <div className="p-5 w-[300px] h-[300px]">
          <img className="" src={imageTrue.url} alt={produto.nome} />
        </div>
      </div>

      <div className=" flex flex-row justify-center align-center">
        <div className=" bg-slate-100 flex flex-col rounded-md shadow-md">
          <div className=" w-full p-4 text-center">
            <h1 className="font-bold text-2xl text-gray-500">{produto.nome}</h1>
          </div>
          <div className="w-full px-8 py-2">
            <span className="font-bold text-lg text-primary px-2">Marca:</span>
            <span className="text-gray-500 font-semibold">{produto.marca}</span>
          </div>
          <div className="w-full px-8 py-2">
            <span className="font-bold text-lg text-primary px-2">
              Descrição:
            </span>
            <span className="text-gray-500 font-semibold">
              {produto.descricao}
            </span>
          </div>
          <div className="w-full px-8 py-2">
            <span className="font-bold text-lg text-primary px-2">Preço:</span>
            <span className="text-gray-500 font-semibold">{produto.valor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductHero;
