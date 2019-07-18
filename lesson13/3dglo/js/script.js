window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // timer
    const countTimer = (deadLine) => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const getTimeRemaining = () => {
            const dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            if (timeRemaining <= 0) {
                hours = '00';
                minutes = '00';
                seconds = '00';
            }

            return { timeRemaining, hours, minutes, seconds };
        };

        const updateClock = () => {

            let timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if (timer.timeRemaining > 0) {
                setInterval(() => {
                    updateClock();
                }, 1000);
            } else if (timer.timeRemaining <= 0) {
                clearInterval(timer);
            }

            timerHours.innerHTML = ("0" + timer.hours).slice(-2);
            timerMinutes.innerHTML = ("0" + timer.minutes).slice(-2);
            timerSeconds.innerHTML = ("0" + timer.seconds).slice(-2);
        }

        updateClock();
    }; //const updateClock

    countTimer('20 july 2019');

    //меню
    const toggleMenue = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    }; //const toggleMenue

    toggleMenue();

    //popup

    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');

        popUpBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popUp.style.display = 'block';
            });

        }); //foreach

        popUpClose.addEventListener('click', () => {
            popUp.style.display = 'none';
        });

        // animation
        let boxElement = document.querySelector('.popup'),
            animation = boxElement.animate([
                { transform: 'translate(0)' },
                { transform: 'translate(100px, 100px)' }
            ], 500);

        // no mobile devices

        if (document.documentElement.clientWidth > 1200) {
            document.write('');
        }

        animation.addEventListener('finish', function() {
            boxElement.style.transform = 'fadeOut(150px, 200px)';
        });

    }; //const togglePopUp

    togglePopUp();

}); //window.addEventListener