const express = require('express');
const Livro = require('../models/Livro');
const validateID = require('../validators/IDValidator');
const { validarCriarLivro, validarAtualizarLivro } = require('../validators/LivroValidator');

const router = express.Router(); // ← ESTA LINHA É FUNDAMENTAL!

// POST /livros - criar livro
router.post('/', validarCriarLivro, async (req, res) => {
  try {
    const livro = await Livro.create(req.body);
    return res.status(201).json(livro);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar livro' });
  }
});

// GET /livros - listar todos
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find().sort({ createdAt: -1 });
    return res.json(livros);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao listar livros' });
  }
});

// GET /livros/:id - buscar por id
router.get('/:id', validateID, async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await Livro.findById(id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    return res.json(livro);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar livro' });
  }
});

// PUT /livros/:id - atualizar
router.put('/:id', validateID, validarAtualizarLivro, async (req, res) => {
  try {
    const { id } = req.params;
    const atualizado = await Livro.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!atualizado) return res.status(404).json({ error: 'Livro não encontrado' });
    return res.json(atualizado);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao atualizar livro' });
  }
});

// DELETE /livros/:id - remover
router.delete('/:id', validateID, async (req, res) => {
  try {
    const { id } = req.params;
    const removido = await Livro.findByIdAndDelete(id);
    if (!removido) return res.status(404).json({ error: 'Livro não encontrado' });
    return res.json({ message: 'Livro removido com sucesso' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao remover livro' });
  }
});

module.exports = router;
