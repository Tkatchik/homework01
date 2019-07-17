'use strict';
let hour = (new Date()).getHours();
if (hour > 23 || hour < 7)
    document.write('Привет совам и лунатикам! ');

if (hour > 6 && hour < 12)
    document.write('Доброе утро! ');

if (hour > 11 && hour < 19)
    document.write('Добрый день!');

if (hour > 18 && hour < 24)
    document.write('Добрый вечер! ');

let day = (new Date()).getDay('Среда');
document.write('Сегодня: ', day);

//Добрый день (утро, вечер, ночь в зависимости от времени суток)
//Сегодня: Понедельник
//Текущее время:12:05:15 PM
//До нового года осталось 175 дней