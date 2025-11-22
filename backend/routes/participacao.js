const express = require("express");
const db = require("../db");
const router = express.Router();

/**
 * @swagger
 * /participacao:
 *   post:
 *     summary: Inscreve um time em um campeonato
 *     description: Cria uma relação entre um time e um campeonato (participação)
 *     tags: [Participação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_time
 *               - id_campeonato
 *             properties:
 *               id_time:
 *                 type: integer
 *                 example: 1
 *               id_campeonato:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Time inscrito no campeonato com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_time:
 *                   type: integer
 *                   example: 1
 *                 id_campeonato:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Time já está neste campeonato"
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /participacao/{id_campeonato}/{id_time}:
 *   delete:
 *     summary: Remove um time de um campeonato
 *     description: Remove a relação de participação entre um time e um campeonato
 *     tags: [Participação]
 *     parameters:
 *       - in: path
 *         name: id_campeonato
 *         required: true
 *         description: ID do campeonato
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: id_time
 *         required: true
 *         description: ID do time
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Time removido do campeonato com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Time removido do campeonato com sucesso."
 *                 relacao:
 *                   type: object
 *                   properties:
 *                     id_time:
 *                       type: integer
 *                       example: 1
 *                     id_campeonato:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Relação entre time e campeonato não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

router.post("/", async (req, res) => {
  try {
    const { id_time, id_campeonato } = req.body;

    const r = await db.query(
      "INSERT INTO Time_Campeonato (id_time, id_campeonato) VALUES ($1, $2) RETURNING *",
      [id_time, id_campeonato]
    );

    res.status(201).json(r.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ msg: "Time já está neste campeonato" });
    }
    if (err.code === "23503") {
      return res.status(400).json({ msg: "Time ou campeonato não existe" });
    }
    res.status(500).json({ msg: err.message });
  }
});

router.delete("/:id_campeonato/:id_time", async (req, res) => {
  try {
    const { id_campeonato, id_time } = req.params;

    const r = await db.query(
      "DELETE FROM Time_Campeonato WHERE id_time = $1 AND id_campeonato = $2 RETURNING *",
      [id_time, id_campeonato]
    );

    if (r.rows.length === 0) {
      return res.status(404).json({ msg: "Relação entre time e campeonato não encontrada." });
    }

    res.status(200).json({
      msg: "Time removido do campeonato com sucesso.",
      relacao: r.rows[0],
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
