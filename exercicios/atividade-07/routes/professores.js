const express = require('express');
const router = express.Router();

let professores = [
  {
    id: 1,
    nome: 'Carlos Pereira',
    email: 'carlos.pereira@example.com',
    cpf: '33333333333',
    curso: 'Engenharia de Software',
    disciplina: 'Programação I'
  },
  {
    id: 2,
    nome: 'Ana Martins',
    email: 'ana.martins@example.com',
    cpf: '44444444444',
    curso: 'Sistemas de Informação',
    disciplina: 'Banco de Dados'
  }
];

let nextIdProf = 3;

function validaProfessorPayload(payload, isUpdate = false) {
  const required = ['nome','email','cpf','curso','disciplina'];
  const missing = [];
  if (!isUpdate) {
    for (const field of required) {
      if (!payload[field]) missing.push(field);
    }
  }
  return missing;
}

// GET /professores
router.get('/', (req, res) => {
  res.json(professores);
});

// GET /professores/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const prof = professores.find(p => p.id === id);
  if (!prof) return res.status(404).json({ error: 'Professor não encontrado' });
  res.json(prof);
});

// POST /professores
router.post('/', (req, res) => {
  const payload = req.body;
  const missing = validaProfessorPayload(payload);
  if (missing.length) return res.status(400).json({ error: 'Campos obrigatórios ausentes', missing });

  const existeCPF = professores.find(p => p.cpf === payload.cpf);
  const existeEmail = professores.find(p => p.email === payload.email);
  if (existeCPF) return res.status(409).json({ error: 'CPF já cadastrado' });
  if (existeEmail) return res.status(409).json({ error: 'Email já cadastrado' });

  const novo = { id: nextIdProf++, ...payload };
  professores.push(novo);
  res.status(201).json(novo);
});

// PUT /professores/:id
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = professores.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Professor não encontrado' });

  const payload = req.body;
  const missing = validaProfessorPayload(payload, true);
  if (missing.length) return res.status(400).json({ error: 'Campos obrigatórios ausentes (update)', missing });

  const existeCPF = professores.find(p => p.cpf === payload.cpf && p.id !== id);
  const existeEmail = professores.find(p => p.email === payload.email && p.id !== id);
  if (existeCPF) return res.status(409).json({ error: 'CPF já cadastrado por outro registro' });
  if (existeEmail) return res.status(409).json({ error: 'Email já cadastrado por outro registro' });

  const atualizado = { ...professores[idx], ...payload, id };
  professores[idx] = atualizado;
  res.json(atualizado);
});

// DELETE /professores/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = professores.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Professor não encontrado' });
  professores.splice(idx, 1);
  res.json({ message: 'Professor removido com sucesso' });
});

module.exports = router;
