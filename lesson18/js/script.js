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

    const insertDots = () => {
        let slide = document.querySelectorAll('.portfolio-item'),
            dots = document.querySelector('.portfolio-dots');

        slide.forEach(() => {
            let newDot = document.createElement('li');
            newDot.className = 'dot';
            dots.appendChild(newDot);
        });

    }; // const insertDots
    insertDots();

    // slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;
            if (!target.matches('.portfolio-btn', '.dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index, ) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);

    }; //const slider
    slider();

    // changing foto

    const fotoChange = () => {
        const teamFotos = document.querySelectorAll('.command .row img');

        teamFotos.forEach(elem => {
            let commonTeamFotos;

            elem.addEventListener('mouseover', (event) => {
                commonTeamFotos = event.target.src;

                event.target.src = event.target.dataset.img;
            });

            elem.addEventListener('mouseleave', (event) => {
                event.target.src = commonTeamFotos;
            });

        });

    }; // const fotoChange
    fotoChange();

    //calc

    const calc = (price = 100) => {

        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value && calcCount.value > 1) {
                countValue += (calcCount.value && calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        }; //countSum


        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });

    }; //const calc
    calc(100);

    //just number

    const justNumber = () => {
        const calcItem = document.querySelectorAll('.calc-item');

        calcItem.forEach((element) => {
            if (element.matches('select')) {
                return;

            } else {
                element.addEventListener('input', (item) => {
                    item.target.value = item.target.value.replace(/\D/g, '');
                });
            }
        });

    }; //justnumber
    justNumber();

    const validationForm = () => {
        const phone = document.querySelectorAll('.form-phone');
        phone.forEach((elem) => {
            elem.addEventListener('input', (item) => {
                item.target.value = item.target.value.replace(/[^\+\d]/g, '');

            });
        });
        document.body.addEventListener('input', (event) => {
            if (event.target.matches('.form-name, #form2-name, .mess')) {
                event.target.value = event.target.value.replace(/[^а-я]/gi, '');
            }
        });

    };
    validationForm();

    // send-ajax-form

    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

        const form = document.getElementById('form1'),
            form2 = document.getElementById('form2'), //footer
            form3 = document.getElementById('form3'); //popup


        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);

            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });

            postData(body,
                () => {
                    form.querySelectorAll('input').forEach(item => item.value = '');
                    statusMessage.textContent = successMessage;
                }, (error) => {
                    statusMessage.textContent = errorMessage;
                    console.log(error);
                });
        }); //form

        form2.addEventListener('submit', (event) => {
            event.preventDefault();
            form2.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form2);

            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });

            postData(body,
                () => {
                    form2.querySelectorAll('input').forEach(item => item.value = '');
                    statusMessage.textContent = successMessage;
                }, (error) => {
                    statusMessage.textContent = errorMessage;
                    console.log(error);
                });

        }); //form2

        form3.addEventListener('submit', (event) => {
            event.preventDefault();
            form3.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            statusMessage.style.cssText = 'color: white';
            const formData = new FormData(form3);

            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });

            postData(body, () => {
                form3.querySelectorAll('input').forEach(item => item.value = '');
                statusMessage.textContent = successMessage;
            }, (error) => {
                statusMessage.textContent = errorMessage;
                console.log(error);
            });
        }); //form3


        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        };

    }; //sendform
    sendForm();

}); //window.addEventListener