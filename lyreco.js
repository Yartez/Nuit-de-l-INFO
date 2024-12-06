/**
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░▒▒▒▒▒░░░░░▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░▒▒▒▒░░░░░▒▓▓░░░░░░░░░░░░▒▒░░▒▒░░▒▒░░░░▒▒▒▒░░░░░░░▒▒▒▒░░░░░░▒▒▒▒░░░░░░░░░░░░░░░░░░░
░░░░░░░░░▒▒░░░░░░▒▓▓░░░░░▓▓▓░░░▒▓▓░░▓▓▓▓▓▓░░▓▓▓▒▒▓▓▓░░░▒▓▓▓▓▓▓░░▒▓▓▓▓▓▓▓▒░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░▒▓▓░░░░░░▓▓▓░▒▓▓░░░▓▓▓░░░░▓▓▓▒▒▒▒▓▓▓░▒▓▓░░░░░░▒▓▓░░░░░▓▓▒░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░▒▓▓░░░░░░░▓▓▓▓▓▒░░░▓▓▓░░░░▓▓▓▒░░░▒░░░▒▓▓▒░░░░░▒▓▓▒░░░░▓▓▒░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░▒▓▓▓▓▓▓▓░░▒▓▓▓▒░░░░▓▓▓░░░░░▓▓▓▓▓▓▓▓░░░▒▓▓▓▓▓▓░░▒▓▓▓▓▓▓▓▒░░░░░░▒▒░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▒░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░▒▒▒░░░░░░▒▒▒░░░░░░░░▒▒▒▒░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
Équipe COFFU
*/

const lyreco_min = 50;
const lyreco_max = 150;
const lyreco_div = document.createElement('div');

//const animations = {0:asciiAnim};

let lyreco_stop = false;
let annimTriggered = false;

lyreco_div.className = 'random-element';
lyreco_div.id = 'Lyreco_element';

lyreco_div.style.zIndex = 999;

lyreco_div.style.opacity = 0.25;
lyreco_div.style.transition = "left 0.3s ease, top 0.3s ease";
lyreco_div.style.position = "absolute";

lyreco_div.onclick = triggerAnnimation;

const lyreco_imageNumber = Math.floor(Math.random() * (22 + 1));
// Crée l'élément img
const lyreco_img = document.createElement('img');
lyreco_img.src = 'http://nuitinfo.cyclonicforce.fr/raceforwater/lyreco/assets/'+lyreco_imageNumber+'.png';
lyreco_img.alt = "Lyreco"

lyreco_img.style.position = "absolute";
lyreco_img.style.top = 0;
lyreco_img.style.left = 0;

// Ajoute l'image au div
lyreco_div.appendChild(lyreco_img);

// Ajoute le div au corps du document
document.body.appendChild(lyreco_div);

let lyreco_aspectRatio = 1;

// Lorsque l'image est chargée
lyreco_img.onload = function() {
    lyreco_aspectRatio = lyreco_img.naturalWidth / lyreco_img.naturalHeight;

    // Positionne l'élément aléatoirement
    positionElementRandomly();

};

function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '1000';

    const modalContent = document.getElementById('modalContent');
    modalContent.style.position = 'absolute';
    modalContent.style.top = '50%';
    modalContent.style.left = '50%';
    modalContent.style.transform = 'translate(-50%, -50%)';
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
}

function closeModal() {
    const element = document.getElementById('Lyreco_element');
    element.remove();
}



function triggerModal(url) {
    const modal = `<div id="modal" style="display: none;">
        <div id="modalContent">
            <button onclick="closeModal();">&times;</button>
            <iframe src="http://nuitinfo.cyclonicforce.fr/raceforwater/lyreco/anims/${url}" height="${window.innerHeight*0.9}px" width="${window.innerHeight*0.9}px"></iframe>
        </div>
    </div>`;
    const element = document.getElementById('Lyreco_element');
    element.innerHTML = modal;
    openModal();
    annimTriggered = true;
}


function triggerAnnimation() {
    const element = document.getElementById('Lyreco_element');
    element.style.width = `${window.innerWidth}px`;
    element.style.height = `${window.innerHeight}px`;
    lyreco_img.style.width = `${window.innerWidth}px`;
    lyreco_img.style.height = `${window.innerHeight}px`;
    element.style.top = '0px';
    element.style.left = '0px';
    element.style.opacity = 0.99;

    triggerModal("tetris");
    lyreco_img.style.display = "none";
}

function positionElementRandomly() {
    const element = document.getElementById('Lyreco_element');
    if (element) {
        const position = getRandomPosition();
        element.style.left = `${position.x}px`;
        element.style.top = `${position.y}px`;

        lyreco_img.height = Math.floor(Math.random() * (lyreco_max - lyreco_min + 1) + lyreco_min);
        lyreco_img.width = lyreco_img.height * lyreco_aspectRatio;
    }
}

function getRandomPosition() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const elementWidth = Math.floor(Math.random() * (lyreco_max - lyreco_min + 1) + lyreco_min);
    const elementHeight = Math.floor(Math.random() * (lyreco_max - lyreco_min + 1) + lyreco_min);

    const randomX = Math.floor(Math.random() * (width - elementWidth));
    const randomY = Math.floor(Math.random() * (height - elementHeight));

    return { x: randomX, y: randomY };
}

function addSweating() {
    const element = document.getElementById('Lyreco_element');
    element.style.opacity = 0.75;
    const img2 = document.createElement('img');
    img2.src = 'http://nuitinfo.cyclonicforce.fr/raceforwater/lyreco/assets/sweating.png';
    img2.alt = 'Sweating';

    img2.height = lyreco_img.height / 1.5;
    img2.width = lyreco_img.width / 3;

    img2.style.position = "absolute";
    img2.style.top = 0;
    img2.style.left = 0;

    element.appendChild(img2);
}

function fleeMouse(event) {
    if (!annimTriggered) {
        const element = document.getElementById('Lyreco_element');
        if (element && !lyreco_stop) {
            lyreco_stop = Math.floor(Math.random() * (999)) == 25;
            const rect = element.getBoundingClientRect();

            // Distance entre la souris et le centre de l'élément
            const dx = event.clientX - (rect.left + rect.width / 2);
            const dy = event.clientY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Si la souris est trop proche, repositionnez l'élément
            if (distance < (lyreco_max+20)*lyreco_aspectRatio) { // Rayon de détection
                const position = getRandomPosition();
                element.style.left = `${position.x}px`;
                element.style.top = `${position.y}px`;
            }
        } else if (lyreco_stop) {
            addSweating();
        }
    }
}

cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
    lyreco_stop = true;
    addSweating();
  });

document.addEventListener('mousemove', fleeMouse);

// Positionne l'élément aléatoirement au chargement de la page
window.onresize = positionElementRandomly;
window.onscroll = positionElementRandomly;
window.onchange = positionElementRandomly;
