'use strict';

let body = document.querySelector('body'),
    collect = document.querySelectorAll('.books'),
    elem = document.querySelectorAll('.book'),
    adv = document.querySelectorAll('.adv'),
    ul = document.querySelectorAll('ul'),
    li = document.querySelectorAll('li'),
    a = document.querySelectorAll('a'),
    chapter8 = document.createElement('li');

console.log(body, collect, elem, a, ul, li);

// Восстановить порядок книг

collect[0].insertBefore(elem[1], elem[0]);
collect[0].insertBefore(elem[4], elem[3]);
collect[0].insertBefore(elem[2], null);

// Заменить картинку заднего фона на другую из папки image
console.log(document.styleSheets);


/* Исправить заголовок в книге 3( Получится - 
    "Книга 3. this и Прототипы Объектов") */

a[4].textContent = 'Книга 3. this и Прототипы Объектов';

//Удалить рекламу со страницы

adv[0].remove();

//Восстановить порядок глав во второй и пятой книге

ul[0].insertBefore(li[1], li[0]);
ul[0].insertBefore(li[3], li[2]);
ul[0].insertBefore(li[6], li[2]);
ul[0].insertBefore(li[2], li[9]);
ul[0].insertBefore(li[9], li[2]);
ul[0].insertBefore(li[8], li[4]);

ul[5].insertBefore(li[47], li[46]);
ul[5].insertBefore(li[55], li[49]);
ul[5].insertBefore(li[48], li[52]);
ul[5].insertBefore(li[51], li[54]);

/*в шестой книге добавить главу “Глава 8: За пределами ES6” 
и поставить её в правильное место (min. 10:05) */

ul[2].appendChild(chapter8);
chapter8.textContent = "Глава 8: За пределами ES6";
ul[2].insertBefore(li['26'], null);