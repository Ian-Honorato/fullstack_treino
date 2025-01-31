import { useState } from "react";
//process
import Cadastro from "./cadastro";
//components
import Navbar from "../../components/navbar/Navbar";

function Contato() {
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [message, setMessage] = useState("");
  const [classMessage, setClassMessage] = useState("hidden");

  const handleSubmitProduto = async (e) => {
    e.preventDefault();
    if (valor < 0 || isNaN(parseFloat(valor))) {
      setClassMessage("text-red-500 font-bold");
      return setMessage("O valor deve ser um numero maior que 0");
    }
    if (
      nome === "" ||
      marca === "" ||
      categoria === "" ||
      descricao === "" ||
      valor === ""
    ) {
      setClassMessage("text-red-500 font-bold");
      return setMessage("Os campos não podem estar vazios");
    }
    const produto = {
      nome,
      marca,
      categoria,
      descricao,
      valor,
    };
    setNome("");
    //console.log(produto);

    const cad = await Cadastro(produto);
    console.log(cad);
    if (cad.status === 200) {
      setClassMessage("text-green-500 font-bold text-center");
      setMessage("Cadastrado com sucesso !");
    }
    // Verificar depois se o cadastro foi bem sucedido
    //apagar o input apos o cadastro bem sucedido
    //criar um stateMessage para mostrar o cadastro bem sucedido
  };

  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar />
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <div className="container text-center py-3">
          <h1 className="text-orange-400 font-extrabold text-3xl">
            Cadastrar Produto
          </h1>
        </div>
        <div>
          <form
            className="p-4 border rounded-sm w-80"
            onSubmit={handleSubmitProduto}
          >
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
            <div className="flex row justify-center align-center mt-4">
              <button
                type="submit"
                className="py-2 px-4 hover:bg-orange-400 rounded-md"
              >
                Salvar
              </button>
            </div>
            <div className="w-full">
              <p className={classMessage}>{message}</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contato;
