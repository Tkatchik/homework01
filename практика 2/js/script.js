window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // timer
    const countTimer = (deadLine) => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const getTimeRemaining = () => {
            let dateStop = new Date(deadLine).getTime(),
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
        };

        updateClock();
    }; //const updateClock

    countTimer('30 july 2019');

    //меню
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

    toggleMenue();

    //popup
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popUpContent = document.querySelector('.popup-content'),
            popUpBtn = document.querySelectorAll('.popup-btn');


        popUpBtn.forEach((elem) => {
            if (window.innerWidth >= 500) {
                elem.addEventListener('click', () => {
                    popUp.style.display = 'block';

                    let moveAnimate = Date.now(),

                        animateTimer = setInterval(function() {
                            let timeSet = Date.now() - moveAnimate;

                            if (timeSet >= 2000) {
                                clearInterval(animateTimer);
                                return;
                            }
                            moving(timeSet);

                            function moving(timeSet) {
                                popUpContent.style.top = timeSet / 35 + 'px';
                            }
                        }, 20);
                });
            } else if (window.innerWidth < 500) {
                elem.addEventListener('click', () => {
                    popUp.style.display = 'block';
                });
            }
        });

        popUp.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popUp.style.display = 'none';
                }
            }
        });
    }; //const togglePopUp

    togglePopUp();

    // tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;

            target = target.closest('.service-header-tab'); //selector cheking, returns null if do not find the right one

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }

        });
    }; //const tabs

    tabs();

    // slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            doT = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
        };

        const startSlide = (time) => {
            setInterval(autoPlaySlide, time);

        };

        const stopSlide = () => {

        };

        startSlide(1500);

    }; //const slider
    slider();

}); //window.addEventListener