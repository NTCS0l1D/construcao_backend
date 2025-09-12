const express = require('express');
const router = express.Router();

// Somar
router.get('/somar', (req, res) => {
  const numA = Number(req.query.numA);
  const numB = Number(req.query.numB);
  res.json({ resultado: numA + numB });
});

// Subtrair
router.get('/subtrair', (req, res) => {
  const numA = Number(req.query.numA);
  const numB = Number(req.query.numB);
  res.json({ resultado: numA - numB });
});

// Multiplicar
router.get('/multiplicar', (req, res) => {
  const numA = Number(req.query.numA);
  const numB = Number(req.query.numB);
  res.json({ resultado: numA * numB });
});

// Dividir
router.get('/dividir', (req, res) => {
  const numA = Number(req.query.numA);
  const numB = Number(req.query.numB);
  if (numB === 0) {
    return res.status(400).json({ erro: 'Divisão por zero não é permitida' });
  }
  res.json({ resultado: numA / numB });
});

// Ao quadrado
router.get('/aoQuadrado', (req, res) => {
  const numA = Number(req.query.numA);
  res.json({ resultado: numA * numA });
});

// Raiz quadrada
router.get('/raizQuadrada', (req, res) => {
  const numA = Number(req.query.numA);
  if (numA < 0) {
    return res.status(400).json({ erro: 'Não é possível calcular raiz quadrada de número negativo' });
  }
  res.json({ resultado: Math.sqrt(numA) });
});

module.exports = router;
