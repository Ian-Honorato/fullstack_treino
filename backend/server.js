import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const port = 3003;

app.listen(port, () => {
  console.log();
  console.log("escutando na porta", port);
  console.log("http://localhost:3003");
});
