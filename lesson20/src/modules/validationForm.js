const validationForm = () => {
    document.body.addEventListener('input', (event) => {
        if (event.target.matches('.form-name, #form2-name, .mess')) {
            event.target.value = event.target.value.replace(/[^а-я]/gi, '');
        }
    });

};

export default validationForm;