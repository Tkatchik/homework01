window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // timer


    countTimer('10 august 2019');

    //меню


    toggleMenue();

    //popup


    togglePopUp();

    // tabs


    tabs();

    // insert Dots
    insertDots();

    // slider

    slider();

    // changing foto

    const fotoChange = () => {
        const teamFotos = document.querySelectorAll('.command__photo');

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

    const validationPhone = () => {
        const phone = document.querySelectorAll('.form-phone');
        phone.forEach((elem) => {
            elem.addEventListener('input', (item) => {
                item.target.value = item.target.value.replace(/[^\+\d]/g, '');

            });
        });
    };
    validationPhone();

    const validationForm = () => {
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

        const form = document.querySelectorAll('form');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: white;';

        form.forEach((item) => {
            item.addEventListener('submit', (event) => {
                event.preventDefault();
                item.appendChild(statusMessage);

                const formData = new FormData(item);
                let body = {};

                formData.forEach((val, key) => {
                    body[key] = val;
                });

                statusMessage.textContent = loadMessage;

                postData(body)
                    .then((response) => {
                        if (response.status !== 200) {
                            throw new Error('Status network not 200');
                        }
                        statusMessage.textContent = successMessage;
                        item.reset();

                    })
                    .catch((error) => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });

            });

        }); //form

        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

        };
    }; //sendform
    sendForm();

}); //window.addEventListener