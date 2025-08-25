// index.js

const calc = require('./calculadora');

console.log('3 + 4 =', calc.somar(3, 4));
console.log('10 - 7 =', calc.subtrair(10, 7));
console.log('6 * 5 =', calc.multiplicar(6, 5));
console.log('8 / 2 =', calc.dividir(8, 2));
console.log('5 ao quadrado =', calc.aoQuadrado(5));
console.log('Raiz quadrada de 25 =', calc.raizQuadrada(25));
