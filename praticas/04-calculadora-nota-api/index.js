// importa o express
const express = require('express')
// cria uma instância do application com express
const app = express()
// importa o intermediário que configura o cors
const cors = require('cors')
// habilita para chegar requisição de qualquer origem
app.use(cors())

// Configuração e Intermediários(Middlawares)

// intermediário de LOG
app.use((req, res, next) => {
  console.log("###### Requisição Chegou ######")
  console.log("Time: ", new Date().toLocaleString())
  console.log("Metodo: ", req.method)
  console.log("Rota: ", req.url)
  next()
})

app.get("/hello", (req, res, next) => {
  res.send("Hello ATUALIZADO!!!")
})

// importar o roteador CalculadoraNota
const calculadoraNotaRouter = require('./routes/CalculadoraNota')
// configuro a minha aplicação pra usar o router (CalculadoraNota) como intermediário
app.use("/", calculadoraNotaRouter)

// Executo a aplicação (Minha API)
app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000")
})