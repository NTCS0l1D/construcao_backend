console.log("#### Projeto 02 - Calculadora de Nota #####")

// importo e executo o prompt-sync
let prompt = require('prompt-sync')()

// Pergunta pro usuário o nome dele e
// captura a resposta pra dentro da variavel nome
let nome = prompt("Qual é o seu nome?")

// usando o nome capturado
console.log("Olá " + nome)

// Calculo da nota do IESB baseado no peso
let {calcularNotaA1, calcularNotaA2, calcularNotaFinal} = require('./CalculadoraNota.js')

console.log("#### Calculando Nota A1 ####")
let exercicioA1 = parseFloat(prompt("Qual a sua nota de exercícios? "))
let trabalhoA1 = parseFloat(prompt("Qual a sua nota de trabalho? "))
let provaA1 = parseFloat(prompt("Qual a sua nota de prova? "))
let notaA1 = calcularNotaA1(exercicioA1, trabalhoA1, provaA1)

console.log("Nota A1 calculada: " + notaA1)
console.log("#### Finalizado calculo Nota A1 ####")

console.log("#### Calculando Nota A2 ####")
let exercicioA2 = parseFloat(prompt("Qual a sua nota de exercícios? "))
let trabalhoA2 = parseFloat(prompt("Qual a sua nota de trabalho? "))
let provaA2 = parseFloat(prompt("Qual a sua nota de prova? "))
let notaA2 = calcularNotaA2(exercicioA2, trabalhoA2, provaA2)

console.log("Nota A2 calculada: " + notaA2)
console.log("#### Finalizado calculo Nota A2 ####")

console.log("#### Calculando Média Final ####")
let media = calcularNotaFinal(notaA1, notaA2)

console.log("Média Final: " + media)

if(media >= 5) {
  console.log("Parabéns " + nome + ", você foi APROVADO!!!!!")
} else {
  console.log(nome + ", estude mais!!! Infelizmente você foi REPROVADO!!!!!")
}