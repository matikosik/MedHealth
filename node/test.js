var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
var lastDay = new Date(y, m + 1, 0).getDate();

//console.log(lastDay)
var fechasDelDia = new Array();
var i = 0
var b = 0

while (b < 12) {
    if (i < lastDay) {
        var year = 2019
        var month = b + 1
        var day = i + 1

        var fecha = new Date(month + ', ' + day + ', ' + year);
        var fecha1 = fecha.getDay();

        if (days[fecha1] == 'Lunes') {
            fechasDelDia.push({ day, month, year })
        }
        i++
    } else {
        b++
        i = 0
    }
}
console.log(fechasDelDia)