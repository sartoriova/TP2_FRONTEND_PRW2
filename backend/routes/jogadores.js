const express = require("express");
const db = require("../db");
const router = express.Router();

/**
 * @swagger
 * /jogadores:
 *   get:
 *     summary: Retorna todos os jogadores
 *     description: Lista todos os jogadores cadastrados no sistema
 *     tags: [Jogadores]
 *     responses:
 *       200:
 *         description: Lista de jogadores retornada com sucesso
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
 *                     example: "Rodrigo Garro"
 *                   salario:
 *                     type: number
 *                     format: float
 *                     example: 800000.00
 *                   id_time:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /jogadores/{id}:
 *   get:
 *     summary: Retorna um jogador específico
 *     description: Obtém os dados de um jogador pelo seu ID
 *     tags: [Jogadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do jogador
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Jogador encontrado
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
 *                   example: "Rodrigo Garro"
 *                 salario:
 *                   type: number
 *                   format: float
 *                   example: 800000.00
 *                 id_time:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Jogador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /jogadores:
 *   post:
 *     summary: Cria um novo jogador
 *     description: Adiciona um novo jogador ao sistema
 *     tags: [Jogadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - salario
 *               - id_time
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Novo Jogador"
 *               salario:
 *                 type: number
 *                 format: float
 *                 example: 500000.00
 *               id_time:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Jogador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *                 nome:
 *                   type: string
 *                   example: "Novo Jogador"
 *                 salario:
 *                   type: number
 *                   format: float
 *                   example: 500000.00
 *                 id_time:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /jogadores/{id}:
 *   put:
 *     summary: Atualiza um jogador
 *     description: Atualiza os dados de um jogador existente
 *     tags: [Jogadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do jogador
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
 *               - salario
 *               - id_time
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Rodrigo Garro Atualizado"
 *               salario:
 *                 type: number
 *                 format: float
 *                 example: 900000.00
 *               id_time:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Jogador atualizado com sucesso
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
 *                   example: "Rodrigo Garro Atualizado"
 *                 salario:
 *                   type: number
 *                   format: float
 *                   example: 900000.00
 *                 id_time:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Jogador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /jogadores/{id}:
 *   delete:
 *     summary: Remove um jogador
 *     description: Exclui um jogador do sistema
 *     tags: [Jogadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do jogador
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Jogador removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Jogador removido com sucesso."
 *                 jogador:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "Rodrigo Garro"
 *       404:
 *         description: Jogador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

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
    res.status(404).json({ msg: "Jogador não encontrado" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome, salario, id_time } = req.body;
    if(!nome || !salario || !id_time){
      return res.status(400).json({msg : "Parâmetros incorretos"});
    }
    const timeCheck = await db.query("SELECT id FROM Time WHERE id = $1", [id_time]);

    if (timeCheck.rows.length === 0) {
      return res.status(404).json({msg : "Time não encontrado"});
    }

    const r = await db.query("INSERT INTO Jogador (nome, salario, id_time) VALUES ($1, $2, $3) RETURNING *", [nome, salario, id_time]);
    res.status(201).json(
      {
        id: r.rows[0].id,
        nome: r.rows[0].nome,
        salario: parseFloat(r.rows[0].salario),
        id_time: r.rows[0].id_time,
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/:id", async (req, res) => {
 try {
    const id = req.params.id;
    const { nome, salario, id_time } = req.body;
    if(!nome || !salario || !id_time){
      return res.status(400).json({msg : "Parâmetros incorretos"});
    }
    const timeCheck = await db.query("SELECT id FROM Time WHERE id = $1", [id_time]);

    if (timeCheck.rows.length === 0) {
      return res.status(404).json({msg : "Time não encontrado"});
    }
    
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
      jogador: {
        id: r.rows[0].id,
        nome: r.rows[0].nome,
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
