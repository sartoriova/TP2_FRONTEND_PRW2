const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  res.send("Bem vindo ao express_template_docker!!!");
});

router.get("/usuarios", async (req, res) => {
  try {
    const result = await db.query("SELECT id, nome, data FROM usuarios");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/transacao/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.transaction(async (conexao) => {
      await conexao.query("UPDATE usuarios SET nome = nome || '_teste' WHERE id = $1", [id]);
      await conexao.query("UPDATE usuarios SET senha = senha || '_teste' WHERE id = $1", [id]);

      const resultado = await conexao.query("SELECT * FROM usuarios WHERE id = $1", [id]);
      return resultado.rows[0];
    });

    if (result) {
      return res.json({ msg: "Usuário atualizado com sucesso!", data: result });
    }

    return res.status(500).json({ msg: "Erro de operação" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
