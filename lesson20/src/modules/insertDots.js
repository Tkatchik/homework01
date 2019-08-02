const insertDots = () => {
    let slide = document.querySelectorAll('.portfolio-item'),
        dots = document.querySelector('.portfolio-dots');

    slide.forEach(() => {
        let newDot = document.createElement('li');
        newDot.className = 'dot';
        dots.appendChild(newDot);
    });

}; // const insertDots

export default insertDots;