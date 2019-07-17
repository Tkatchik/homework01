'use strict';

const today = new Date();
let hour = (today.getHours());
if (hour > 23 || hour < 7)
    document.write('Привет совам и лунатикам! ');

if (hour > 6 && hour < 12)
    document.write('Доброе утро! ');

if (hour > 11 && hour < 19)
    document.write('Добрый день!');

if (hour > 18 && hour < 24)
    document.write('Добрый вечер! ' + '<br>');

let day = (today.getDay()),
    dayOfWeek = '';
if (day == 0) dayOfWeek = "Воскресенье";
if (day == 1) dayOfWeek = "Понедельник";
if (day == 2) dayOfWeek = "Вторник";
if (day == 3) dayOfWeek = "Среда";
if (day == 4) dayOfWeek = "Четверг";
if (day == 5) dayOfWeek = "Пятница";
if (day == 6) dayOfWeek = "Суббота";

document.write('Сегодня: ' + dayOfWeek + '<br>');

document.write('Текущее время: ' + today.toLocaleTimeString('en') + '<br>');

function daysLeftNewYear() {

    let nextDate = new Date("January 1, 2020"),
        //Количество миллисекунд в одном дне
        msPerDay = 24 * 60 * 60 * 1000,
        //Высчитываем количество дней
        daysLeft = Math.round((nextDate.getTime() -
            today.getTime()) / msPerDay),
        dayname = '',
        ds = '' + daysLeft,
        dd = parseInt(ds.substr(ds.length - 1));

    if (daysLeft > 4 && daysLeft < 21) dayname = ' дней';
    else
    if (dd == 1) dayname = ' день';
    else
    if (dd == 2 || dd == 3 || dd == 4) dayname = ' дня';
    else dayname = ' дней';
    //Выводим надпись в документ
    document.write('До нового года осталось ' + daysLeft + dayname + '!!!');
}

daysLeftNewYear();