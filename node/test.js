var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayName = days[1];

var month = 11
var day = 1

var birthday = new Date('11', day, ', 2019');
var day1 = birthday.getDay();
// Sunday - Saturday : 0 - 6

console.log(days[day1]);

var i = 1