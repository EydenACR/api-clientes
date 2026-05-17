require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const clientesRoutes = require("./routes/clientes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/clientes", clientesRoutes);

db.connect((err) => {
  if (err) {
    console.log("Error conectando MySQL");
    console.log(err);
  } else {
    console.log("MySQL conectado correctamente");
  }
});

app.get("/", (req, res) => {
  res.send("API funcionando");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});