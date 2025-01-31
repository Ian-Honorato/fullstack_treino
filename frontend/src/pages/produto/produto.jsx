import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from "../../components/navbar/Navbar";
const Produto = () => {
  const { id } = useParams();
  const location = useLocation(); //use location para pegar o que vio no state
  const produto = location.state?.produto; // melhorar a verificação do state
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div>
        <h1>Produto {produto?.nome || `ID: ${id}`}</h1>
        <p>Marca: {produto?.marca}</p>
        <p>Preço: R$ {produto?.valor}</p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>
    </>
  );
};

export default Produto;
