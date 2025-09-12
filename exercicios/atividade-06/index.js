const express = require('express');
const app = express();

// Importa o router da calculadora
const calculadoraRouter = require('./routes/calculadora');

// Usa o router no caminho /calculadora
app.use('/calculadora', calculadoraRouter);

// Define a porta
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app; // necessário para testes com supertest
