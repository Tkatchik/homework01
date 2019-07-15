// Сделать класс DomElement, который

function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

// содержит метод, который создает элемент на странице

DomElement.prototype.createElem = function() {

    let insertSymbol = prompt('Пожалуйста, введите . или #');

    if (insertSymbol == '.') {
        let div = document.createElement('div');

        //с помощью cssText задавать стили: 

        div.style.cssText = 'height: 100px; width: 100 px; background: yellow; font-site: 25px;';
        div.id = "text;";
        div.innerHTML = `<div> ${insertSymbol} </div>`;
        div.textContent = 'What did you expect?';
        document.body.appendChild(div);

    } else if (insertSymbol == '#') {
        let newParagraph = document.createElement('p');

        //с помощью cssText задавать стили: 

        newParagraph.style.cssText = 'height: 200px; width: 200px; background: green; font-size: 20px;';
        newParagraph.className = "text";
        newParagraph.innerHTML = `<p> ${insertSymbol} </p>`;
        newParagraph.textContent = 'Is that what you expexted?';
        document.body.appendChild(newParagraph);
    }
};

// Создать новый объект на основе класса DomElement

let newObject = new DomElement(40, 300, 'orange', 18);
newObject.textContent = `Hello, I'm your newObject`;
newObject.createElem();

console.dir(newObject);