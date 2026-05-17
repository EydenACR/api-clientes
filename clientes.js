const express = require("express");

const router = express.Router();

const controller = require("../controllers/clientesController");

router.get("/", controller.obtenerClientes);

router.post("/", controller.crearCliente);

router.put("/:id", controller.actualizarCliente);

router.delete("/:id", controller.eliminarCliente);

module.exports = router;