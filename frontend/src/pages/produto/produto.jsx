import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import ProductHero from "../../components/productHero/productHero";
const Produto = () => {
  const { id } = useParams();
  const location = useLocation(); //use location para pegar o que vio no state
  const produto = location.state?.produto; //usei location para pegar o que vio no state
  const navigate = useNavigate();

  console.log(produto);
  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-start mx-4">
        <button
          className=" px-4 py-1 rounded-md text-gray-500 bg-slate-200 border border-orange-300 hover:text-primary hover:bg-slate-100"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>
      <ProductHero produto={produto} />
    </>
  );
};

export default Produto;
