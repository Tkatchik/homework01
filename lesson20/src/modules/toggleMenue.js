const toggleMenue = () => {
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li');

    btnMenu.addEventListener('click', () => {
        menu.classList.toggle('active-menu');

    });

    menu.addEventListener('click', (event) => {
        let target = event.target;

        if (target.classList.contains('close-btn') || target.classList.contains('menu')) {
            menu.classList.toggle('active-menu');

        } else {
            menuItems.forEach(() => {
                menu.classList.toggle('active-menu');

            });
        }
        if (!target) {
            menu.classList.contains('menu');

        }

    });

}; //const toggleMenue