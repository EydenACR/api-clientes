const db = require("../config/db");

const obtenerClientes = (req, res) => {

  const sql = "SELECT * FROM cliente";

  db.query(sql, (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);

  });

};

const crearCliente = (req, res) => {

  const { nombre, email, telefono } = req.body;

  const sql = `
    INSERT INTO cliente(nombre, email, telefono)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nombre, email, telefono], (err, results) => {

    if (err) {

      // ERROR EMAIL DUPLICADO
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          mensaje: "El correo ya existe"
        });
      }

      return res.status(500).json(err);
    }

    res.status(201).json({
      mensaje: "Cliente creado correctamente",
      id: results.insertId
    });

  });

};

const actualizarCliente = (req, res) => {

  const { id } = req.params;

  const { nombre, email, telefono } = req.body;

  const sql = `
    UPDATE cliente
    SET nombre = ?, email = ?, telefono = ?
    WHERE id_cliente = ?
  `;

  db.query(sql, [nombre, email, telefono, id], (err, results) => {

    if (err) {

      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          mensaje: "El correo ya existe"
        });
      }

      return res.status(500).json(err);
    }

    res.json({
      mensaje: "Cliente actualizado correctamente"
    });

  });

};

const eliminarCliente = (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM cliente WHERE id_cliente = ?";

  db.query(sql, [id], (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      mensaje: "Cliente eliminado correctamente"
    });

  });

};

module.exports = {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente
};