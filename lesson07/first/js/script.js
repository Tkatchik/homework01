'use strict';

// Восстановить порядок книг

let collect = document.querySelectorAll('.books'),
    book = document.querySelectorAll('.book');

console.log(collect, book);
collect[0].insertBefore(book[1], book[0]);
collect[0].insertBefore(book[4], book[3]);
collect[0].appendChild(book[2]);

// Заменить картинку заднего фона на другую из папки image
console.log(document.styleSheets);


/* Исправить заголовок в книге 3( Получится - 
    "Книга 3. this и Прототипы Объектов") */
book[4].textContent = 'Книга 3. this и Прототипы Объектов';

//Удалить рекламу со страницы

/*let advert = document.querySelector('adv');
console.log(advert.classlist);
advert.classlist.remove('span');*/


//Восстановить порядок глав во второй и пятой книге


/*в шестой книге добавить главу “Глава 8: За пределами ES6” 
и поставить её в правильное место (min. 10:05) */

book[2].append('Глава 8: За пределами ES');
console.log(book[2]);
book[2].insertBefore(book[4], book[3]);