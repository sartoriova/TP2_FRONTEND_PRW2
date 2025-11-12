const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  res.send("Bem vindo ao Sistema de Gerenciamento de Esportes!!! Documentação disponível em /api");
});

module.exports = router;