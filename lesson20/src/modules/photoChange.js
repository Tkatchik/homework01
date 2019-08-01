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