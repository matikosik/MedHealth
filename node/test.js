const eldoctor = AvailabilityMongo.find({ doctor: 'matiaskosik@gmail.com' }, function(err, result) {
    var largo = result[0].days
    var largo2 = largo.length

    var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

    var date = new Date(),
        y = 2019,
        m = date.getMonth();
    var lastDay = new Date(y, m + 1, 0).getDate();

    var fechasDelDia = new Array();
    var i = ("0" + date.getDate()).slice(-2);
    var b = date.getMonth()

    if (largo2 == 1) {
        while (b < 12) {
            if (i < lastDay) {
                var year = 2019
                var month = b + 1
                var day = i + 1

                var fecha = new Date(month + ', ' + day + ', ' + year);
                var fecha1 = fecha.getDay();

                if (days[fecha1] == result[0].days[0]) {
                    fechasDelDia.push(day + '/' + month + '/' + year)
                }
                i++
            } else {
                b++
                i = 0
            }
        }
        console.log(fechasDelDia)
    } else if (largo2 == 2) {
        while (b < 12) {
            if (i < lastDay) {
                var year = 2019
                var month = b + 1
                var day = i + 1

                var fecha = new Date(month + ', ' + day + ', ' + year);
                var fecha1 = fecha.getDay();

                if (days[fecha1] == result[0].days[0] || days[fecha1] == result[0].days[1]) {
                    fechasDelDia.push(day + '/' + month + '/' + year)
                }
                i++
            } else {
                b++
                i = 0
            }
        }
        console.log(fechasDelDia)
    } else if (largo2 == 3) {
        while (b < 12) {
            if (i < lastDay) {
                var year = 2019
                var month = b + 1
                var day = i + 1

                var fecha = new Date(month + ', ' + day + ', ' + year);
                var fecha1 = fecha.getDay();

                if (days[fecha1] == result[0].days[0] || days[fecha1] == result[0].days[1] || days[fecha1] == result[0].days[2]) {
                    fechasDelDia.push(day + '/' + month + '/' + year)
                }
                i++
            } else {
                b++
                i = 0
            }
        }
        console.log(fechasDelDia)
    } else if (largo2 == 4) {
        while (b < 12) {
            if (i < lastDay) {
                var year = 2019
                var month = b + 1
                var day = i + 1

                var fecha = new Date(month + ', ' + day + ', ' + year);
                var fecha1 = fecha.getDay();

                if (days[fecha1] == result[0].days[0] || days[fecha1] == result[0].days[1] || days[fecha1] == result[0].days[2] || days[fecha1] == result[0].days[3]) {
                    fechasDelDia.push(day + '/' + month + '/' + year)
                }
                i++
            } else {
                b++
                i = 0
            }
        }
        console.log(fechasDelDia)
    } else if (largo2 == 5) {
        while (b < 12) {
            if (i < lastDay) {
                var year = 2019
                var month = b + 1
                var day = i + 1

                var fecha = new Date(month + ', ' + day + ', ' + year);
                var fecha1 = fecha.getDay();

                if (days[fecha1] == result[0].days[0] || days[fecha1] == result[0].days[1] || days[fecha1] == result[0].days[2] || days[fecha1] == result[0].days[3] || days[fecha1] == result[0].days[4]) {
                    fechasDelDia.push(day + '/' + month + '/' + year)
                }
                i++
            } else {
                b++
                i = 0
            }
        }
        console.log(fechasDelDia)
    } else if (largo2 == 6) {
        while (b < 12) {
            if (i < lastDay) {
                var year = 2019
                var month = b + 1
                var day = i + 1

                var fecha = new Date(month + ', ' + day + ', ' + year);
                var fecha1 = fecha.getDay();

                if (days[fecha1] == result[0].days[0] || days[fecha1] == result[0].days[1] || days[fecha1] == result[0].days[2] || days[fecha1] == result[0].days[3] || days[fecha1] == result[0].days[4] || days[fecha1] == result[0].days[5]) {
                    fechasDelDia.push(day + '/' + month + '/' + year)
                }
                i++
            } else {
                b++
                i = 0
            }
        }
        console.log(fechasDelDia)
    } else if (largo2 == 7) {
        while (b < 12) {
            if (i < lastDay) {
                var year = 2019
                var month = b + 1
                var day = i + 1

                var fecha = new Date(month + ', ' + day + ', ' + year);
                var fecha1 = fecha.getDay();

                if (days[fecha1] == result[0].days[0] || days[fecha1] == result[0].days[1] || days[fecha1] == result[0].days[2] || days[fecha1] == result[0].days[3] || days[fecha1] == result[0].days[4] || days[fecha1] == result[0].days[5] || days[fecha1] == result[0].days[6]) {
                    fechasDelDia.push(day + '/' + month + '/' + year)
                }
                i++
            } else {
                b++
                i = 0
            }
        }
        console.log(fechasDelDia)
    }
});