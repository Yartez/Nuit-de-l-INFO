document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section-item');
    const bodyCorp = document.getElementById('body-image'); // L'élément de corps à zoomer

    // Les transformations pour chaque section
    const sectionTransformations = {
        "home": { scale: 1, translate: "0, 0" },
        "coeur": { scale: 3, translate: "-100px, 200px" },
        "poumons": { scale: 3.5, translate: "100px, 150px" },
        "cerveau": { scale: 3.5, translate: "-60px, 260px" },
        "veines": { scale: 3, translate: "60px, -160px" },
        "peau": { scale: 1.5, translate: "-120px, -60px" }
    };

    let currentSectionIndex = 0; // Index de la section actuellement active
    let isScrolling = false; // Empêche les scrolls rapides successifs

    function activateSection(index) {
        if (index < 0 || index >= sections.length) return;

        // Mettre à jour la section active
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
                const sectionDataTarget = section.getAttribute('data-target');
                if (sectionDataTarget in sectionTransformations) {
                    const { scale, translate } = sectionTransformations[sectionDataTarget];
                    bodyCorp.style.transition = "transform 0.5s ease-out";
                    bodyCorp.style.transform = `scale(${scale}) translate(${translate})`;
                }
            } else {
                section.classList.remove('active');
            }
        });

        // Mettre à jour l'index actuel
        currentSectionIndex = index;
    }

    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;

        const targetSection = sections[index];
        const targetPosition = targetSection.offsetTop;

        // Défilement fluide vers la section cible
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Activer la section correspondante
        activateSection(index);
    }

    // Gérer l'événement de scroll (wheel)
    window.addEventListener('wheel', function (event) {
        if (isScrolling) return;

        isScrolling = true;
        const direction = event.deltaY > 0 ? 1 : -1; // Vers le bas (1) ou vers le haut (-1)
        const newIndex = currentSectionIndex + direction;

        // Passer à la nouvelle section
        scrollToSection(newIndex);

        // Réinitialiser le verrouillage après une courte durée
        setTimeout(() => {
            isScrolling = false;
        }, 800); // Ajustez ce délai en fonction de la durée d'animation du scroll
    });

    // Initialiser l'état au chargement
    activateSection(currentSectionIndex);
});
