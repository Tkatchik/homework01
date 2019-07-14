// Сделать класс DomElement, который

function originObj(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;

    // содержит метод, который создает элемент на странице

    originObj.prototype.createElem = function() {
        if (this.selector === '.') {
            originObj = document.createElement('div');
        } else if (this.selector === '#') {
            originObj = document.createElement('p');
        }
    };

    console.log(originObj.prototype.createElem());
    originObj.textContent = 'What did you expect?';

    //с помощью cssText задавать стили: 

    this.height.cssText = '100px';
    this.width.style.cssText = '100px';
    this.bg.style.cssText = 'yellow';
    this.fontSize.style.cssText = '25px';
}

// Создать новый объект на основе класса DomElement

let secondObj = new originObj;
console.log('originObj: ', originObj);
console.log('secondObj: ', secondObj);