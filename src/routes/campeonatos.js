const express = require("express");
const db = require("../db");
const router = express.Router();

/**
 * @swagger
 * /campeonatos:
 *   get:
 *     summary: Retorna todos os campeonatos
 *     description: Lista todos os campeonatos cadastrados no sistema
 *     tags: [Campeonatos]
 *     responses:
 *       200:
 *         description: Lista de campeonatos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: "Mundial de clubes"
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /campeonatos/{id}:
 *   get:
 *     summary: Retorna um campeonato específico
 *     description: Obtém os dados de um campeonato pelo seu ID
 *     tags: [Campeonatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do campeonato
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Campeonato encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "Mundial de clubes"
 *       404:
 *         description: Campeonato não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /campeonatos/{id}/times:
 *   get:
 *     summary: Retorna os times de um campeonato
 *     description: Lista todos os times participantes de um campeonato específico
 *     tags: [Campeonatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do campeonato
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de times retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: "Corinthians"
 *       404:
 *         description: Nenhum time encontrado para este campeonato
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /campeonatos:
 *   post:
 *     summary: Cria um novo campeonato
 *     description: Adiciona um novo campeonato ao sistema
 *     tags: [Campeonatos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Campeonato Brasileiro"
 *     responses:
 *       201:
 *         description: Campeonato criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 nome:
 *                   type: string
 *                   example: "Campeonato Brasileiro"
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /campeonatos/{id}:
 *   put:
 *     summary: Atualiza um campeonato
 *     description: Atualiza os dados de um campeonato existente
 *     tags: [Campeonatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do campeonato
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Mundial de Clubes da FIFA"
 *     responses:
 *       200:
 *         description: Campeonato atualizado com sucesso
 *       404:
 *         description: Campeonato não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /campeonatos/{id}:
 *   delete:
 *     summary: Remove um campeonato
 *     description: Exclui um campeonato do sistema
 *     tags: [Campeonatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do campeonato
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Campeonato removido com sucesso
 *       404:
 *         description: Campeonato não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

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
