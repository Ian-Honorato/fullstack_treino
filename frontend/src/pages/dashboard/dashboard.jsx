import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Navigate, useLocation } from "react-router";

import isLogged from "../Login/isLoggedIn";

import { listProduto } from "../../service/listMercado";
import { deleteProduto } from "../../service/deleteProduto";

import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

function Dashboard() {
  const auth = isLogged();
  const [permission, setPermission] = useState(null);
  const location = useLocation();
  const acess = location.state?.acess;
  /*   console.log("Acess " + acess);
  console.log("auth " + auth);
 */
  const [produtos, setProdutos] = useState([]);
  const [responseRequest, setresponseRequest] = useState("");

  useEffect(() => {
    if (location.state || auth) {
      setPermission(true);

      /*  console.log("a permission: " + permission); */
    } else {
      setPermission(false);
    }
  }, [acess, auth]);
  useEffect(() => {
    const getProdutos = async () => {
      try {
        const data = await listProduto();
        if (data) {
          setProdutos(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getProdutos();
  }, []);

  /*   console.log("a permission: " + permission); */

  if (permission === false) {
    return (
      <Navigate to="/" state={{ message: "O usuário deve estar logado" }} />
    );
  }
  const handleDelete = async (id) => {
    const deletProduto = await deleteProduto(id);
    if (deletProduto) {
      setProdutos(produtos.filter((produto) => produto.id !== id)); // atualizar os produtos
      setresponseRequest("Produto deletado com sucesso!");
    } else {
      setresponseRequest("Ocorreu algum problema ao deletar");
    }
  };
  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar />
      </div>
      <div className="flex align-center justify-center">
        <h1 className="text-blue-500 font-extrabold text-3xl"> Dashboard</h1>
      </div>

      <section className="py-8 sm:py-16 lg:py-10 bg-gray-100">
        {produtos ? (
          <div className="py-8  ">
            <h1 className="text-center text-2xl text-blue-400 py-2">
              Produtos
            </h1>
            <table className="table-auto border-collapse border  border-gray-300 w-[600px] m-auto ">
              <thead className="text-left">
                <tr>
                  <td>id</td>
                  <td>Nome</td>
                  <td>Marca</td>
                  <td>Valor</td>
                  <td>Ações</td>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => {
                  return (
                    <tr key={produto.id}>
                      <td>{produto.id}</td>
                      <td>{produto.nome}</td>
                      <td>{produto.marca}</td>
                      <td>{produto.valor}</td>
                      <td className="flex flex-row jusfy-center align-center">
                        <button onClick={() => handleDelete(produto.id)}>
                          <FaTrashAlt className="text-red-500 " />
                        </button>
                        <button>
                          <FaRegEdit className="text-indigo-600 mx-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Ainda nao temos produtos</p>
        )}
        <p className="text-center text-2xl font-bold">{responseRequest}</p>
      </section>
    </>
  );
}

export default Dashboard;
