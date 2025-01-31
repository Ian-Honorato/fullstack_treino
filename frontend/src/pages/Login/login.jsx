import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import LoginProcess from "./conn";
import { Navigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    // Usando async/await
    e.preventDefault();
    try {
      const response = await LoginProcess({ email, senha });
      console.log(response);

      if (response.permission === true) {
        setRedirect(true);
        console.log(redirect);
      } else {
        console.log(response.statusRequest);
        let msgError = response.ErrorData.mensagem;
        return setErro(msgError);
      }
    } catch (e) {
      console.log(e);
      setErro("Ocorreu um erro ao processar a solicitação.");
    }
  };
  if (redirect) {
    return <Navigate to="/dashboard" replace={true} state={{ acess: true }} />;
  }
  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar />
      </div>

      <div className="w-80 h-96 bg-orange-400 mx-auto mt-6">
        <div className="w-full text-center text-white p-4 text-3xl font-bold font-sans">
          Login
        </div>
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col align-baseline w-64 mx-auto py-5">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="rounded-md px-2 p-1"
              />
            </div>
            <div className="flex flex-col align-baseline w-64 mx-auto">
              <label htmlFor="senha">Senha:</label>
              <input
                type="text"
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
                className="rounded-md px-2 p-1"
              />
            </div>
            <div className="flex align-center justify-center">
              <button
                type="submit"
                className="my-4 w-32 py-2 rounded-sm font-bold text-white hover:border-white  hover:bg-white hover:text-orange-500 transition delay-150"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
        <div className="text-center">
          <p className="text-white"> {erro} </p>
        </div>
      </div>
    </>
  );
}

export default Login;
