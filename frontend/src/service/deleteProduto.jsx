import axios from "axios";

export const deleteProduto = async (id) => {
  const url = `http://localhost:3003/produtos/${id}`;
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};
