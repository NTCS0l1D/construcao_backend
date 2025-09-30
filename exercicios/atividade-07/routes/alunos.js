const express = require('express');
const router = express.Router();

// Array em memória com exemplos
let alunos = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    cpf: '11111111111',
    telefone: '(61) 99999-0001',
    dataNascimento: '2000-01-15'
  },
  {
    id: 2,
    nome: 'Maria Souza',
    email: 'maria.souza@example.com',
    cpf: '22222222222',
    telefone: '(61) 99999-0002',
    dataNascimento: '1999-05-10'
  }
];

let nextId = 3;

// Helpers de validação
function validaAlunoPayload(payload, isUpdate = false) {
  const required = ['nome','email','cpf','telefone','dataNascimento'];
  const missing = [];

  if (!isUpdate) {
    for (const field of required) {
      if (!payload[field]) missing.push(field);
    }
  }

  // opcional: validar formato de CPF/email aqui
  return missing;
}

// GET /alunos
router.get('/', (req, res) => {
  res.json(alunos);
});

// GET /alunos/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const aluno = alunos.find(a => a.id === id);
  if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
  res.json(aluno);
});

// POST /alunos
router.post('/', (req, res) => {
  const payload = req.body;
  const missing = validaAlunoPayload(payload);
  if (missing.length) return res.status(400).json({ error: 'Campos obrigatórios ausentes', missing });

  // duplicatas por CPF ou email
  const existeCPF = alunos.find(a => a.cpf === payload.cpf);
  const existeEmail = alunos.find(a => a.email === payload.email);
  if (existeCPF) return res.status(409).json({ error: 'CPF já cadastrado' });
  if (existeEmail) return res.status(409).json({ error: 'Email já cadastrado' });

  const novo = {
    id: nextId++,
    nome: payload.nome,
    email: payload.email,
    cpf: payload.cpf,
    telefone: payload.telefone,
    dataNascimento: payload.dataNascimento
  };
  alunos.push(novo);
  res.status(201).json(novo);
});

// PUT /alunos/:id
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const alunoIndex = alunos.findIndex(a => a.id === id);
  if (alunoIndex === -1) return res.status(404).json({ error: 'Aluno não encontrado' });

  const payload = req.body;
  // valida (em update, campos podem ser parciais)
  const missing = validaAlunoPayload(payload, true);
  if (missing.length) return res.status(400).json({ error: 'Campos obrigatórios ausentes (update)', missing });

  // checar duplicatas (exceto o próprio registro)
  const existeCPF = alunos.find(a => a.cpf === payload.cpf && a.id !== id);
  const existeEmail = alunos.find(a => a.email === payload.email && a.id !== id);
  if (existeCPF) return res.status(409).json({ error: 'CPF já cadastrado por outro registro' });
  if (existeEmail) return res.status(409).json({ error: 'Email já cadastrado por outro registro' });

  // atualizar
  const atualizado = { ...alunos[alunoIndex], ...payload, id };
  alunos[alunoIndex] = atualizado;
  res.json(atualizado);
});

// DELETE /alunos/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = alunos.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Aluno não encontrado' });
  alunos.splice(idx, 1);
  res.json({ message: 'Aluno removido com sucesso' });
});

module.exports = router;
