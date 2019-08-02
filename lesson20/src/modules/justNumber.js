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

export default justNumber;