const validationPhone = () => {
    const phone = document.querySelectorAll('.form-phone');
    phone.forEach((elem) => {
        elem.addEventListener('input', (item) => {
            item.target.value = item.target.value.replace(/[^\+\d]/g, '');

        });
    });
};