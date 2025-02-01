import axios from "axios";

const url = "http://localhost:3003/produtos";

export const listProduto = async () => {
  try {
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
