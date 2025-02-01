import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
//Components
import Navbar from "../../components/navbar/Navbar";
import ListaProdutos from "../../components/listaProdutos/listaProdutos";
//retorno da api
import { listProduto } from "../../service/listMercado";

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
          {produtos ? (
            <section className="py-8 sm:py-16 lg:py-10 bg-gray-100">
              <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                  <h1 className="text-3xl text-orange-400 uppercase font-bold">
                    Produtos
                  </h1>
                </div>
                {/* Primeiro componente - passando as propriedades para o componente */}
                <ListaProdutos
                  produtos={produtos}
                  onNavigate={handleNavigate} // Passando a função para o componente
                />
              </div>
            </section>
          ) : (
            <p> Nenhum produto localizado </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Mercado;
