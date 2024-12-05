// script.js

// Fonction de détection du scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;  // Taille de la fenêtre (100vh)
    const bodyImage = document.getElementById('body-image');
    const scrollItems = document.querySelectorAll('.scroll-item');

    // Calcul de la transformation de zoom en fonction du scroll
    const scale = 1 + scrollY / (2 * windowHeight);  // Ajuste la vitesse du zoom
    bodyImage.style.transform = `scale(${scale})`;

    // Affichage des éléments en fonction de leur position
    scrollItems.forEach(item => {
        // Récupérer la position cible de chaque élément
        const target = item.getAttribute('data-target');
        const targetElement = document.querySelector(`[data-target="${target}"]`);
        const rect = targetElement.getBoundingClientRect();

        // Vérifier si l'élément est dans la plage de 100vh
        if (rect.top >= 0 && rect.top <= windowHeight) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});
