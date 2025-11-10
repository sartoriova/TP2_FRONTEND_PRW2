const express = require("express");
const { swaggerUi, specs } = require("./swagger");
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM Jogador");
    res.json(r.rows);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const r = await db.query("SELECT * FROM Jogador WHERE id = $1", [id]);
    if (r.rows.length > 0) {
      return res.json(r.rows[0]);
    }
    res.status(404).json("Not found");
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome, salario, id_time } = req.body;
    const r = await db.query("INSERT INTO Jogador (nome, salario, id_time) VALUES ($1, $2, $3) RETURNING *", [nome, salario, id_time]);
    res.status(201).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/:id", async (req, res) => {
 try {
    const id = req.params.id;
    const { nome, salario, id_time } = req.body;
    const r = await db.query(
      "UPDATE Jogador SET nome=$1, salario=$2, id_time=$3 WHERE id=$4 RETURNING *", 
      [nome, salario, id_time, id]
    );
    if (r.rows.length === 0) {
      return res.status(404).json({ msg: "Jogador não encontrado" });
    }
    res.status(200).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const r = await db.query("DELETE FROM Jogador WHERE id = $1 RETURNING *", [id]);
    if (r.rows.length === 0) {
      return res.status(404).json({ msg: "Jogador não encontrado." });
    }
    res.status(200).json({
      msg: "Jogador removido com sucesso.",
      jogador: r.rows[0],
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;