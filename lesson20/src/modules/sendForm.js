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

export default sendForm;