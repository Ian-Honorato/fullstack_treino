export default function isLogged() {
  const auth = sessionStorage.getItem("authToken");

  if (auth) {
    return true;
  } else {
    return false;
  }
}
