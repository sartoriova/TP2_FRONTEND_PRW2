const express = require("express");
const { swaggerUi, specs } = require("./swagger");
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM Campeonato");
    res.json(r.rows);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const r = await db.query("SELECT * FROM Campeonato WHERE id = $1", [id]);
    if (r.rows.length > 0) {
      return res.json(r.rows[0]);
    }
    res.status(404).json({ msg: "Campeonato não encontrado." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id/times", async (req, res) => {
  try {
    let id = req.params.id;
    const r = await db.query("SELECT t.id, t.nome FROM Time t INNER JOIN Time_Campeonato tc ON t.id = tc.id_time WHERE tc.id_campeonato = $1", [id]);
    if (r.rows.length > 0) {
      return res.json(r.rows);
    }
    res.status(404).json({ msg: "Nenhum time encontrado para esse campeonato" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome } = req.body;
    const r = await db.query("INSERT INTO Campeonato (nome) VALUES ($1) RETURNING *", [nome]);
    res.status(201).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nome } = req.body;
    const r = await db.query("UPDATE Campeonato SET nome = $1 WHERE id = $2 RETURNING *", [nome, id]);
    if (r.rows.length === 0) {
      return res.status(404).json({ msg: "Campeonato não encontrado para atualização." });
    }
    res.status(200).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const r = await db.query("DELETE FROM Campeonato WHERE id = $1 RETURNING *", [id]);
    if (r.rows.length === 0) {
      return res.status(404).json({ msg: "Campeonato não encontrado." });
    }
    res.status(200).json({
      msg: "Campeonato removido com sucesso.",
      campeonato: r.rows[0],
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;