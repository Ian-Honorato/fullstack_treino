import axios from "axios";

async function LoginProcess({ email, senha }) {
  try {
    const response = await axios.post("http://localhost:3003/login", {
      email,
      senha,
    });
    console.log(response);

    const { token } = response.data;

    if (token) {
      sessionStorage.setItem("authToken", token);
      return { permission: true, token };
    }
  } catch (e) {
    const { status, data } = e.response;
    return {
      permission: false,
      statusRequest: status,
      ErrorData: data,
    };
  }
}
export default LoginProcess;
