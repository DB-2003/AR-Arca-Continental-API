const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')
dotenv.config();

const app = express();
const port = 3001;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Full house in da house");
});

//Aqui estan todas las rutas
app.use(require("./routes/routes.js"));

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});
