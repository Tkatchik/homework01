// Сделать класс DomElement, который

function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;

    //с помощью cssText задавать стили: 

    DomElement.textContent = 'What did you expect?';
    DomElement.style.cssText = 'font-size: this.fontSize; height: this.heigth; width: this.width; background: this.bg';
}

console.log(DomElement);

// содержит метод, который создает элемент на странице

DomElement.prototype.createElem = function() {
    let newElem;
    if (this.selector[0] === '.') {
        newElem = document.createElement('div');
        newElem.classList.add(this.selector.substr(1));
    } else if (this.selector[0] === '#') {
        newElem = document.createElement('p');
    }

    // Создать новый объект на основе класса DomElement

    function() {
        let firstElem = new DomElement('.newContainer', 'blue', 250, 250, 50);
        firstElem.createElem();
    }
};