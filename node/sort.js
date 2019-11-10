var numeros = [{
    year: 2019,
    month: 11,
    day: 9 
},
{
    year: 2019,
    month: 5,
    day: 15 
},
{
    year: 2020,
    month: 2,
    day: 16 
},
{
    year: 2018,
    month: 7,
    day: 6 
}
]
var sortedNumeros = numeros.sort((a, b) => parseFloat(a.day) - parseFloat(b.day));
var sortedNumeros1 = sortedNumeros.sort((a, b) => parseFloat(a.month) - parseFloat(b.month));
var sortedNumeros2 = sortedNumeros1.sort((a, b) => parseFloat(a.year) - parseFloat(b.year));
console.log(sortedNumeros2)