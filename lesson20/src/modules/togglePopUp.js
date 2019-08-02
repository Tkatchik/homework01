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

export default togglePopUp;