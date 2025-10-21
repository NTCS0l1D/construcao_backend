require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// --- Variáveis de ambiente ---
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

if (!DB_USER || !DB_PASS || !DB_HOST || !DB_NAME) {
  console.error('❌ Erro: variáveis de ambiente do banco não estão completas. Verifique o arquivo .env');
  process.exit(1);
}

// --- Montar URI de conexão ---
const uri = `mongodb+srv://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASS)}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

// --- Conexão com MongoDB Atlas ---
mongoose
  .connect(uri)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Erro ao conectar no MongoDB Atlas:\n', err.message);
    process.exit(1);
  });

// --- Definição do Schema e Model ---
const bookSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    editora: { type: String, required: true },
    ano: { type: Number, required: true },
    preco: { type: Number, required: true }
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

// --- Esquema de validação Joi ---
const bookValidationSchema = Joi.object({
  titulo: Joi.string().min(2).max(100).required(),
  autor: Joi.string().min(2).max(100).required(),
  editora: Joi.string().min(2).max(100).required(),
  ano: Joi.number().integer().min(0).max(new Date().getFullYear()).required(),
  preco: Joi.number().positive().required(),
});

// --- Rotas CRUD ---

// Rota inicial de verificação
app.get('/', (req, res) => {
  res.json({ message: '📚 API de Livros funcionando!' });
});

// CREATE
app.post('/books', async (req, res, next) => {
  try {
    const { error } = bookValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: 'Dados inválidos', details: error.details });

    const { titulo, autor, editora, ano, preco } = req.body;
    const book = new Book({ titulo, autor, editora, ano, preco });
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// READ (todos)
app.get('/books', async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// READ (por ID)
app.get('/books/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'ID inválido' });

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ error: 'Livro não encontrado' });

    res.json(book);
  } catch (err) {
    next(err);
  }
});

// UPDATE
app.put('/books/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'ID inválido' });

    const { error } = bookValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: 'Dados inválidos', details: error.details });

    const updated = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ error: 'Livro não encontrado' });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE
app.delete('/books/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: 'ID inválido' });

    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Livro não encontrado' });

    res.json({ message: 'Livro removido com sucesso' });
  } catch (err) {
    next(err);
  }
});

// --- Middleware Global de Tratamento de Erros ---
app.use((err, req, res, next) => {
  console.error('🔥 Erro inesperado:', err.stack);
  res.status(500).json({
    error: 'Erro interno no servidor',
    message: err.message,
  });
});

// --- Inicialização do servidor ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
