import React, { useEffect, useState } from "react";
//componente
import Navbar from "../../components/navbar/Navbar";
//router para o SPA
import { Await, Navigate, useLocation } from "react-router";

//verificação
import isLogged from "../Login/isLoggedIn";

//services
import { listProduto } from "../../service/listMercado";
import { deleteProduto } from "../../service/deleteProduto";
import { getProduto } from "../../service/getProduto";
import { updateProduto } from "../../service/upddateProduto";
//icones
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

function Dashboard() {
  //Permissao de acesso
  const auth = isLogged(); //chegcagem na sessionStorage
  const [permission, setPermission] = useState(null);
  const location = useLocation(); // UseLocatio para pegar a permissao que está vindo da pagina de login
  const acess = location.state?.acess;
  //Produtos
  const [produtos, setProdutos] = useState([]);
  //resosta da requisições
  const [responseRequest, setresponseRequest] = useState("");
  //tratar abertura e fechamento do modal
  const [openUpdate, setOpen] = useState(false);
  //dados do formulario
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [id, setId] = useState("");
  //Use Effect para verificar se o usuario esta logado e setar a permissao
  useEffect(() => {
    if (location.state || auth) {
      setPermission(true);
    } else {
      setPermission(false);
    }
  }, [acess, auth]);
  //Use Effect para verificar se o usuario está logado e setar a permissao
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
    try {
      const deletProduto = await deleteProduto(id);
      if (deletProduto) {
        setProdutos(produtos.filter((produto) => produto.id !== id));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdate = async (id) => {
    try {
      const produto = await getProduto(id);
      if (produto) {
        setId(produto.id);
        setNome(produto.nome);
        setMarca(produto.marca);
        setCategoria(produto.categoria);
        setDescricao(produto.descricao);
        setValor(produto.valor);
        setOpen(true);
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    //Declarar o useState dos dados do formulario para alimentar o novo objeto e depois enviar para api processar os dados
    const novoProduto = {
      id,
      nome,
      marca,
      categoria,
      descricao,
      valor,
    };

    const update = await updateProduto(novoProduto);
    console.log(update);
    if (update) {
      //console.log(update);
      const produtosAtualizados = produtos.map((produto) => {
        if (produto.id === update.novoProduto.id) {
          produto = update.novoProduto;
        }
        return produto;
      });
      setProdutos(produtosAtualizados);
      setresponseRequest("Produto atualizado com sucesso");
      setOpen(false);
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

      <section className="py-8 sm:py-16 lg:py-10 bg-gray-100 relative">
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
                        <button onClick={() => handleUpdate(produto.id)}>
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

        {openUpdate && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={() => setOpen(false)} // Fecha ao clicar no fundo
          >
            <div
              className="bg-orange-100 p-6 rounded shadow-lg w-[300px]"
              onClick={(e) => e.stopPropagation()}
            >
              <h1 className="text-center text-2xl py-3">Alterar Produto</h1>
              <form onSubmit={handleSubmitUpdate}>
                <div className="flex flex-col">
                  <label htmlFor="produto">Produto:</label>
                  <input
                    type="text"
                    id=""
                    name="nome"
                    value={nome}
                    className="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="marca">Marca:</label>
                  <input
                    type="text"
                    id=""
                    name="marca"
                    value={marca}
                    className="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                    onChange={(e) => setMarca(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Categoria:</label>
                  <input
                    type="text"
                    id=""
                    name="categoria"
                    className="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Descricao:</label>
                  <textarea
                    type="text"
                    id=""
                    name="descricao"
                    className="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Valor:</label>
                  <input
                    type="text"
                    id=""
                    name="valor"
                    className="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                  />
                </div>
                <div className="flex flex-col my-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white rounded py-2 "
                  >
                    Salvar
                  </button>

                  <button
                    type="button"
                    className="bg-red-500 text-white py-2  rounded my-2"
                    onClick={() => setOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Dashboard;
