require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const LivroRouter = require('./controllers/LivroController');


const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;


// Connection string montada com variáveis de ambiente
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
if (!DB_USER || !DB_PASS || !DB_HOST || !DB_NAME) {
console.error('Variáveis de ambiente do banco não configuradas. Veja .env');
process.exit(1);
}


const uri = `mongodb+srv://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASS)}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch(err => {
console.error('Erro ao conectar no MongoDB', err.message);
process.exit(1);
});


app.use('/livros', LivroRouter);


app.use((err, req, res, next) => {
// handler global de erros simples
console.error(err);
res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
});


app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
});