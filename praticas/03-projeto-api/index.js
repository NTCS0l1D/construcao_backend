// importar o express
const express = require('express')

// criar uma instância no meu backend com o express
const app = express()

// intermediários (Middlewares)
// Intermediário de LOG
// Toda requisição vai passar por ele e imprimir no terminal
// informações da requisição
app.use((req, res, next) => {
  console.log("Time: ", new Date().toLocaleString())
  console.log("Metodo: ", req.method)
  console.log("Rota: ", req.url)
  next()
})


// Hello World
// req -> a requisição (os dados da requisição)
// res -> manipulador de resposta
// next -> chama o proximo intermediário
// mapeamento da requisição
app.get('/hello', (req, res, next) => {
  // envio da resposta
  res.send('Hello World ATUALIZADO MEU PRIMEIRO')
})

// endpoint da minha API
app.get('/pessoas', (req, res, next) => {
  const pessoas = [
    {
      id: 1,
      nome: "João Pedro"
    },
    {
      id: 2,
      nome: "Ana Paula"
    }
  ]

  res.json(pessoas)
})


// executar a aplicação escolhendo a porta que ela vai escutar
app.listen(3000, () => {
  console.log("Minha aplicação está rodando em http://localhost:3000")
})