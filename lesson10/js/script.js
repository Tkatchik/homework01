'use strict';

function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.createElem = function() {
    let newElem;
    if (this.selector[0] === '.') {
        newElem = document.createElement('div');
        newElem.classList.add(this.selector.substr(1));
    } else if (this.selector[0] === '#') {
        newElem = document.createElement('p');
    }

    newElem.textContent = 'What did you expect?';
    newElem.style.height = this.height + 'px';
    newElem.style.width = this.width + 'px';
    newElem.style.bg = this.bg;
    newElem.style.fontSize = this.fontSize + 'px';
};

let firstElem = new DomElement('blue, 250, 250, 50');
firstElem.createElem();

console.log(DomElement, firstElem, newElem);