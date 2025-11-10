const express = require("express");
const { swaggerUi, specs } = require("./swagger");
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM Time");
    res.json(r.rows);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const r = await db.query("SELECT * FROM Time WHERE id = $1", [id]);
    if (r.rows.length > 0) {
      return res.json(r.rows[0]);
    }
    res.status(404).json({ msg: "Time não encontrado."} );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id/jogadores", async (req, res) => {
  try{
    let id = req.params.id;
    const r = await db.query("SELECT * FROM Jogador WHERE id_time = $1", [id]);
    if(r.rows.length > 0){
      return res.json(r.rows);
    }
    res.status(404).json({ msg: "Nenhum jogador encontrado neste time." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id/campeonatos", async (req, res) => {
  try {
    const id = req.params.id;
    const r = await db.query(
      `SELECT c.id, c.nome
       FROM Campeonato c
       INNER JOIN Time_Campeonato tc ON c.id = tc.id_campeonato
       WHERE tc.id_time = $1`,
      [id]
    );
    if (r.rows.length > 0) {
      return res.json(r.rows);
    }
    res.status(404).json({ msg: "Nenhum campeonato encontrado para este time." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome } = req.body;
    const r = await db.query("INSERT INTO Time (nome) VALUES ($1) RETURNING *", [nome]);
    res.status(201).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nome } = req.body;
    const r = await db.query("UPDATE Time SET nome = $1 WHERE id = $2 RETURNING *", [nome, id]);
    if (r.rows.length === 0) {
      return res.status(404).json({ msg: "Time não encontrado para atualização." });
    }
    res.status(200).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const r = await db.query("DELETE FROM Time WHERE id = $1 RETURNING *", [id]);
    if (r.rows.length === 0) {
      return res.status(404).json({ msg: "Time não encontrado." });
    }
    res.status(200).json({
      msg: "Time removido com sucesso.",
      time: r.rows[0],
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;