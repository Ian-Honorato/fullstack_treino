import axios from "axios";

export const getProduto = async (id) => {
  const url = `http://localhost:3003/produtos/${id}`;
  try {
    const response = await axios.get(url);
    //console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
