import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { listProduto } from "./listMercado";
import { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { useNavigate, useSearchParams } from "react-router";

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

  //Aqui utilizei o hook do react Usenavigate para passar os parametros do id e o state com objt produto
  const handleNavigate = (produto) => {
    //alert(produto.nome);
    navigate(`/produto/${produto.id}`, { state: { produto } });
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center align-center py-4">
        <div className="">
          {produtos.length === 0 ? (
            <p> nenhum produto localizado</p>
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
                    return (
                      <div
                        key={produto.id}
                        className="relative overflow-hidden bg-white border border-gray-200 rounded-xl"
                      >
                        <div className="relative m-5">
                          <div className="absolute top-2 right-3">
                            <a href="#" className="text-decoration-none">
                              <CiHeart className="size-6 hover:text-red-500" />
                            </a>
                          </div>
                          <div className="bg-orange-500 w-full h-40 text-center"></div>
                          <div className="px-6 py-4">
                            <p className="text-[12px] uppercase text-orange-500">
                              {produto.marca}
                            </p>
                            <h3 className="py-2">{produto.nome}</h3>
                            <p className="py-2">R$ {produto.valor}</p>
                          </div>
                          <div className="abslute bottom-0 ">
                            <button
                              className="flex-items-center justify-center w-full px-4 py-2 text-sm font-bold text-white transition-all duration-200 bg-gray-900"
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
