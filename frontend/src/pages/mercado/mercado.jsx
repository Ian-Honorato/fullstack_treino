import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { listProduto } from "./listMercado";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router";

const Mercado = () => {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProdutos = async () => {
      try {
        const data = await listProduto();
        setProdutos(data);
      } catch (e) {
        console.log(e);
      }
    };
    getProdutos();
  }, []);

  // Aqui utilizei o hook do react useNavigate para passar os parâmetros do id e o state com o objeto produto
  const handleNavigate = (produto) => {
    navigate(`/produto/${produto.id}`, { state: { produto } });
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center align-center py-4">
        <div>
          {produtos.length === 0 ? (
            <p> Nenhum produto localizado </p>
          ) : (
            <section className="py-8 sm:py-16 lg:py-10 bg-gray-100">
              <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                  <h1 className="text-3xl text-orange-400 uppercase font-bold">
                    Produtos
                  </h1>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3 lg:grid-cols-5 sm:mt-10">
                  {produtos.map((produto) => {
                    // Lógica para verificar qual imagem exibir
                    const imageToShow = produto.Images.find(
                      (image) => image.flag === "true"
                    );

                    return (
                      <div
                        key={produto.id}
                        className="relative overflow-hidden bg-white border border-gray-200 rounded-xl"
                      >
                        <div className="relative w-[300px] m-5">
                          <div className="absolute top-2 right-3">
                            <a href="#" className="text-decoration-none">
                              <CiHeart className="size-6 hover:text-red-500" />
                            </a>
                          </div>
                          <div className="w-full h-[250px] text-center">
                            {/* logica para cverivar e renderizar a imagem  */}
                            {imageToShow ? (
                              <img
                                src={imageToShow.url}
                                alt={produto.nome}
                                key={imageToShow.id}
                                className="w-full h-full"
                              />
                            ) : (
                              <div className="text-center text-[10px]">
                                Ainda não temos imagem
                              </div>
                            )}
                          </div>
                          <div className="w-full px-2 py-4">
                            <p className="text-[12px] uppercase text-orange-500">
                              {produto.marca}
                            </p>
                            <h3 className="py-2">{produto.nome}</h3>
                            <p className="py-2">R$ {produto.valor}</p>
                          </div>
                          <div className="">
                            <button
                              className="flex-items-center justify-center w-full px-4 py-2 text-sm font-bold text-white transition-all duration-200 bg-green-600 hover:bg-green-800
                              rounded-sm"
                              onClick={() => handleNavigate(produto)}
                            >
                              Ver mais
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Mercado;
